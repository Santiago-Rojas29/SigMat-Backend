/**
 * Seed inicial de SIGMAT — usa SQL directo para evitar conflictos de entidades.
 * Ejecutar: npm run seed
 */
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5434'),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME ?? 'Sigmat',
  entities: [],
  synchronize: false,
});

async function seed() {
  await dataSource.initialize();
  console.log('\n🌱 Conectado a la base de datos. Iniciando seed...\n');

  const q = dataSource.query.bind(dataSource);

  // ── 1. Roles ──────────────────────────────────────────────────────────────
  console.log('📋 Creando roles...');

  const rolesData = [
    { nombre: 'Administrador', descripcion: 'Acceso completo al sistema SIGMAT' },
    { nombre: 'Instructor',    descripcion: 'Gestión de materiales y préstamos' },
    { nombre: 'Aprendiz',      descripcion: 'Consulta y solicitud de préstamos' },
  ];

  for (const r of rolesData) {
    const existing = await q(`SELECT id FROM rol WHERE nombre = $1`, [r.nombre]);
    if (existing.length === 0) {
      await q(
        `INSERT INTO rol (id, nombre, descripcion) VALUES (gen_random_uuid(), $1, $2)`,
        [r.nombre, r.descripcion],
      );
      console.log(`   ✅ Rol '${r.nombre}' creado`);
    } else {
      console.log(`   ℹ️  Rol '${r.nombre}' ya existe`);
    }
  }

  // ── 2. Permisos ───────────────────────────────────────────────────────────
  console.log('\n🔑 Creando permisos...');

  const permisosData = [
    { nombre: 'Gestión de Usuarios',   descripcion: 'Acceso a usuarios, roles y permisos',  modulo: 'usuarios' },
    { nombre: 'Gestión de Materiales',  descripcion: 'Acceso a materiales, lotes y unidades', modulo: 'materiales' },
    { nombre: 'Gestión de Préstamos',   descripcion: 'Acceso a solicitudes y préstamos',      modulo: 'prestamos' },
    { nombre: 'Control de Inventario',  descripcion: 'Control y seguimiento del inventario',  modulo: 'inventario' },
    { nombre: 'Gestión de Ubicaciones', descripcion: 'Acceso a ubicaciones del almacén',      modulo: 'ubicaciones' },
  ];

  for (const p of permisosData) {
    const existing = await q(`SELECT id FROM permisos WHERE modulo = $1`, [p.modulo]);
    if (existing.length === 0) {
      await q(
        `INSERT INTO permisos (id, nombre, descripcion, modulo) VALUES (gen_random_uuid(), $1, $2, $3)`,
        [p.nombre, p.descripcion, p.modulo],
      );
      console.log(`   ✅ Permiso '${p.modulo}' creado`);
    } else {
      console.log(`   ℹ️  Permiso '${p.modulo}' ya existe`);
    }
  }

  // ── 3. Asignar permisos a roles ───────────────────────────────────────────
  console.log('\n🔗 Asignando permisos a roles...');

  const asignaciones: Record<string, string[]> = {
    Administrador: ['usuarios', 'materiales', 'prestamos', 'inventario', 'ubicaciones'],
    Instructor:    ['materiales', 'prestamos', 'inventario', 'ubicaciones'],
    Aprendiz:      ['prestamos'],
  };

  for (const [rolNombre, modulos] of Object.entries(asignaciones)) {
    const [rol] = await q(`SELECT id FROM rol WHERE nombre = $1`, [rolNombre]);
    if (!rol) continue;

    for (const modulo of modulos) {
      const [permiso] = await q(`SELECT id FROM permisos WHERE modulo = $1`, [modulo]);
      if (!permiso) continue;

      const exists = await q(
        `SELECT 1 FROM rol_permisos WHERE id_rol = $1 AND id_permiso = $2`,
        [rol.id, permiso.id],
      );
      if (exists.length === 0) {
        await q(
          `INSERT INTO rol_permisos (id_rol, id_permiso) VALUES ($1, $2)`,
          [rol.id, permiso.id],
        );
        console.log(`   ✅ ${rolNombre} → ${modulo}`);
      } else {
        console.log(`   ℹ️  ${rolNombre} → ${modulo} (ya asignado)`);
      }
    }
  }

  // ── 4. Usuario administrador por defecto ──────────────────────────────────
  console.log('\n👤 Creando usuario administrador...');

  const adminEmail = 'admin@sigmat.sena.edu.co';
  const [adminRol] = await q(`SELECT id FROM rol WHERE nombre = 'Administrador'`);
  const adminExists = await q(`SELECT id FROM usuario WHERE correo = $1`, [adminEmail]);

  if (adminExists.length === 0) {
    const hash = await bcrypt.hash('Admin123!', 10);
    await q(
      `INSERT INTO usuario (id, id_rol, tipo_documento, numero_documento, nombres, apellidos, correo, telefono, estado, contrasena)
       VALUES (gen_random_uuid(), $1, 'cc', '00000001', 'Administrador', 'SIGMAT', $2, '0000000000', 'activo', $3)`,
      [adminRol.id, adminEmail, hash],
    );
    console.log(`   ✅ Usuario creado`);
    console.log(`      Correo:     ${adminEmail}`);
    console.log(`      Contraseña: Admin123!`);
  } else {
    console.log(`   ℹ️  Usuario admin ya existe (${adminEmail})`);
  }

  // ── 5. Usuario administrador personalizado solicitado ──────────────────────
  console.log('\n👤 Creando/Actualizando usuario administrador personalizado...');
  const customEmail = 'lm20052908@gmail.com';
  const customExists = await q(`SELECT id FROM usuario WHERE correo = $1`, [customEmail]);
  const customHash = await bcrypt.hash('Lucius29*', 10);

  if (customExists.length === 0) {
    await q(
      `INSERT INTO usuario (id, id_rol, tipo_documento, numero_documento, nombres, apellidos, correo, telefono, estado, contrasena)
       VALUES (gen_random_uuid(), $1, 'cc', '00000002', 'Luis', 'Administrador', $2, '3000000000', 'activo', $3)`,
      [adminRol.id, customEmail, customHash],
    );
    console.log(`   ✅ Usuario personalizado creado (${customEmail})`);
  } else {
    await q(
      `UPDATE usuario SET id_rol = $1, contrasena = $2, estado = 'activo' WHERE correo = $3`,
      [adminRol.id, customHash, customEmail]
    );
    console.log(`   ✅ Usuario personalizado actualizado (${customEmail})`);
  }

  // ── 6. Actualizar usuario de desarrollo al rol Administrador ──────────────
  const devEmail = '00sgor@gmail.com';
  const devExists = await q(`SELECT id FROM usuario WHERE correo = $1`, [devEmail]);
  if (devExists.length > 0 && adminRol) {
    await q(`UPDATE usuario SET id_rol = $1 WHERE correo = $2`, [adminRol.id, devEmail]);
    console.log(`\n   ✅ ${devEmail} actualizado a rol Administrador`);
  }

  // ── 6. Centro ─────────────────────────────────────────────────────────────
  console.log('\n🏛️  Creando centro SENA...');

  let centroId: string;
  const centroExisting = await q(`SELECT id FROM centro WHERE nombre = $1`, ['SENA Regional']);
  if (centroExisting.length === 0) {
    const [centro] = await q(
      `INSERT INTO centro (id, nombre, ciudad, direccion, telefono, estado)
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5) RETURNING id`,
      ['SENA Regional', 'Medellín', 'Calle 51 # 57-30', '6044444444', 'activo'],
    );
    centroId = centro.id;
    console.log(`   ✅ Centro 'SENA Regional' creado`);
  } else {
    centroId = centroExisting[0].id;
    console.log(`   ℹ️  Centro ya existe`);
  }

  // ── 7. Sede ───────────────────────────────────────────────────────────────
  console.log('\n📍 Creando sede...');

  let sedeId: string;
  const sedeExisting = await q(`SELECT id_sede FROM sede WHERE nombre = $1`, ['Sede Principal']);
  if (sedeExisting.length === 0) {
    const [sede] = await q(
      `INSERT INTO sede (id_sede, id_centro, nombre, direccion, telefono, estado)
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5) RETURNING id_sede`,
      [centroId, 'Sede Principal', 'Carrera 32 # 48-15', '6044444445', 'activo'],
    );
    sedeId = sede.id_sede;
    console.log(`   ✅ Sede 'Sede Principal' creada`);
  } else {
    sedeId = sedeExisting[0].id_sede;
    console.log(`   ℹ️  Sede ya existe`);
  }

  // ── 8. Área ───────────────────────────────────────────────────────────────
  console.log('\n📁 Creando área...');

  const [adminUser] = await q(`SELECT id FROM usuario WHERE correo = 'admin@sigmat.sena.edu.co'`);
  const areaExisting = await q(`SELECT id_area FROM area WHERE nombre = $1`, ['Almacén Principal']);
  if (areaExisting.length === 0 && adminUser) {
    await q(
      `INSERT INTO area (id_sede, id_usuario, nombre, descripcion, estado)
       VALUES ($1, $2, $3, $4, $5)`,
      [sedeId, adminUser.id, 'Almacén Principal', 'Área principal de almacenamiento del SENA', 'activo'],
    );
    console.log(`   ✅ Área 'Almacén Principal' creada`);
  } else {
    console.log(`   ℹ️  Área ya existe`);
  }

  // ── 9. Tipos de ubicación ─────────────────────────────────────────────────
  console.log('\n📦 Creando tipos de ubicación...');

  // Eliminar residuos de la migración enum → varchar
  const nullTipos = await q(`SELECT id_tipo_ubicacion FROM tipo_ubicacion WHERE nombre IS NULL OR nombre = ''`);
  if (nullTipos.length > 0) {
    const ids = nullTipos.map((t: any) => t.id_tipo_ubicacion);
    // Primero eliminar ubicaciones que referencian esos tipos huérfanos
    await q(`DELETE FROM ubicacion WHERE id_tipo_ubicacion = ANY($1::int[])`, [ids]);
    // Luego eliminar los tipos nulos
    await q(`DELETE FROM tipo_ubicacion WHERE nombre IS NULL OR nombre = ''`);
    console.log(`   🧹 Eliminados ${nullTipos.length} tipos sin nombre y sus ubicaciones`);
  }

  const tiposData = [
    { nombre: 'bodega',      descripcion: 'Espacio de almacenamiento de materiales y equipos' },
    { nombre: 'laboratorio', descripcion: 'Espacio equipado para prácticas y experimentos' },
    { nombre: 'aula',        descripcion: 'Espacio de aprendizaje y formación' },
  ];

  for (const t of tiposData) {
    const existing = await q(`SELECT id_tipo_ubicacion FROM tipo_ubicacion WHERE nombre = $1`, [t.nombre]);
    if (existing.length === 0) {
      await q(
        `INSERT INTO tipo_ubicacion (nombre, descripcion) VALUES ($1, $2)`,
        [t.nombre, t.descripcion],
      );
      console.log(`   ✅ Tipo '${t.nombre}' creado`);
    } else {
      console.log(`   ℹ️  Tipo '${t.nombre}' ya existe`);
    }
  }

  console.log('\n🎉 Seed completado exitosamente.\n');
  await dataSource.destroy();
}

seed().catch((err) => {
  console.error('❌ Error en el seed:', err.message);
  process.exit(1);
});
