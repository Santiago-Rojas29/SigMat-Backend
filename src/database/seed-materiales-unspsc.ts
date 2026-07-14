/**
 * Seed de materiales UNSPSC — importa productos del clasificador colombiano (v14.08).
 * Ejecutar: npm run seed:materiales
 *
 * Por defecto lee: ../../../unspcs-clasificador-de-bienes-y-servicios-de-naciones-unidas-en-espanol.xlsx
 * Se puede sobreescribir con: UNSPSC_FILE=/ruta/al/archivo.xlsx npm run seed:materiales
 */
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as XLSX from 'xlsx';
import * as path from 'path';

dotenv.config();

const dataSource = new DataSource({
  type: 'postgres',
  host:     process.env.DB_HOST     ?? 'localhost',
  port:     parseInt(process.env.DB_PORT ?? '5435'),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME     ?? 'Sigmat',
  entities: [],
  synchronize: false,
});

// ── Segmentos relevantes para el SENA ────────────────────────────────────────
// Clave = código de segmento UNSPSC (entero)
// categoria: 'consumible' | 'no consumible'  — usada para el enum CategoriaMaterial
// unidad_medida: requerida para consumibles; null para no consumibles
const SEGMENTOS: Record<number, { categoria: 'consumible' | 'no consumible'; unidad_medida: string | null }> = {
  27: { categoria: 'no consumible', unidad_medida: null    }, // Herramientas y Maquinaria General
  41: { categoria: 'no consumible', unidad_medida: null    }, // Equipos de Laboratorio
  43: { categoria: 'no consumible', unidad_medida: null    }, // TI y Telecomunicaciones
  44: { categoria: 'consumible',    unidad_medida: 'unidad' }, // Equipos de Oficina y Suministros
  47: { categoria: 'consumible',    unidad_medida: 'unidad' }, // Equipos de Limpieza y Suministros
  55: { categoria: 'consumible',    unidad_medida: 'unidad' }, // Publicaciones e Impresos
  56: { categoria: 'no consumible', unidad_medida: null    }, // Muebles y Mobiliario
  60: { categoria: 'consumible',    unidad_medida: 'unidad' }, // Material Educativo
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function padCodigo(code: number | string): string {
  return String(code).padStart(8, '0');
}

function truncar(str: string, len: number): string {
  return String(str ?? '').trim().substring(0, len);
}

// ── Seed ──────────────────────────────────────────────────────────────────────

async function seedMateriales() {
  // Ruta al Excel — env > arg > ruta por defecto (relativa al script)
  const xlsxPath =
    process.env.UNSPSC_FILE ??
    path.resolve(
      __dirname,
      '../../../unspcs-clasificador-de-bienes-y-servicios-de-naciones-unidas-en-espanol.xlsx',
    );

  console.log(`\n📂 Leyendo archivo: ${xlsxPath}`);

  const wb = XLSX.readFile(xlsxPath);
  const ws = wb.Sheets[wb.SheetNames[0]];

  // La cabecera real está en la fila 5 (índice), los datos desde la fila 6
  // Columnas: [0] CódSeg, [1] NomSeg, [2] CódFam, [3] NomFam, [4] CódClase, [5] NomClase, [6] CódProd, [7] NomProd
  const allRows: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
  const dataRows = allRows.slice(6).filter(r => r[6] && String(r[6]).trim() !== '');

  // Filtrar por segmentos SENA
  const filtered = dataRows.filter(r => !!SEGMENTOS[Number(r[0])]);

  console.log(`📊 Total productos en el archivo : ${dataRows.length.toLocaleString()}`);
  console.log(`📊 Productos relevantes para SENA: ${filtered.length.toLocaleString()}`);

  const desglose = filtered.reduce<Record<string, number>>((acc, r) => {
    const label = `${r[0]} – ${String(r[1]).substring(0, 40)}`;
    acc[label] = (acc[label] ?? 0) + 1;
    return acc;
  }, {});
  for (const [seg, count] of Object.entries(desglose)) {
    console.log(`   Segmento ${seg}: ${count} productos`);
  }

  await dataSource.initialize();
  console.log('\n🌱 Conectado a la base de datos. Iniciando importación...\n');

  const q = dataSource.query.bind(dataSource);

  // Cargar códigos ya existentes para evitar consulta individual por fila
  const existingRows: { codigo_unspsc: string }[] = await q(
    `SELECT codigo_unspsc FROM material`,
  );
  const existingCodes = new Set(existingRows.map(r => r.codigo_unspsc));
  console.log(`ℹ️  Materiales ya en BD: ${existingCodes.size}`);

  const toInsert = filtered.filter(r => !existingCodes.has(padCodigo(r[6])));
  console.log(`📥 Materiales a insertar: ${toInsert.length}\n`);

  let insertados = 0;
  let errores    = 0;

  for (const row of toInsert) {
    const segCodigo   = Number(row[0]);
    const segNombre   = String(row[1] ?? '');
    const famNombre   = String(row[3] ?? '');
    const claseNombre = String(row[5] ?? '');
    const prodCodigo  = row[6];
    const prodNombre  = String(row[7] ?? '');

    const codigoUnspsc  = padCodigo(prodCodigo);
    const { categoria, unidad_medida } = SEGMENTOS[segCodigo];

    const nombre      = truncar(prodNombre, 150) || truncar(claseNombre, 150);
    const tipo        = truncar(famNombre, 50);
    const descripcion = `${segNombre} > ${famNombre} > ${claseNombre}`;

    try {
      await q(
        `INSERT INTO material (id, nombre, categoria, tipo, marca, modelo, descripcion, codigo_unspsc, unidad_medida)
         VALUES (gen_random_uuid(), $1, $2, $3, NULL, NULL, $4, $5, $6)`,
        [nombre, categoria, tipo, descripcion, codigoUnspsc, unidad_medida],
      );
      insertados++;

      if (insertados % 200 === 0) {
        console.log(`   ✅ ${insertados} / ${toInsert.length} materiales insertados...`);
      }
    } catch (e: any) {
      errores++;
      if (errores <= 5) {
        console.warn(`   ⚠️  Error al insertar ${codigoUnspsc} (${nombre}): ${e.message}`);
      }
    }
  }

  console.log(`\n🎉 Importación completada:`);
  console.log(`   ✅ Insertados             : ${insertados}`);
  console.log(`   ℹ️  Omitidos (ya existían) : ${existingCodes.size > 0 ? filtered.length - toInsert.length : 0}`);
  if (errores > 0) {
    console.log(`   ❌ Errores                : ${errores}`);
  }
  console.log(`   📦 Total procesados       : ${filtered.length}\n`);

  await dataSource.destroy();
}

seedMateriales().catch((err) => {
  console.error('❌ Error en el seed de materiales:', err.message);
  process.exit(1);
});
