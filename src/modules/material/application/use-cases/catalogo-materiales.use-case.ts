import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { Repository, MoreThan, DataSource } from 'typeorm';
import { LoteOrmEntity } from 'src/modules/lote/infrastructure/entities/lote.orm-entity';
import { UnidadOrmEntity, EstadoUnidad } from 'src/modules/unidad/infrastructure/entities/unidad.orm-entity';
import { EstadoLote } from 'src/modules/lote/domain/entities/lote.entity';
import { TenantService } from 'src/common/tenant/tenant.service';

@Injectable()
export class CatalogoMaterialesUseCase {
  constructor(
    @InjectRepository(LoteOrmEntity)
    private readonly loteRepo: Repository<LoteOrmEntity>,
    @InjectRepository(UnidadOrmEntity)
    private readonly unidadRepo: Repository<UnidadOrmEntity>,
    private readonly tenant: TenantService,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  /**
   * @param userId     id del usuario que consulta (para restringir por ficha si es aprendiz)
   * @param esAprendiz si es true, solo se muestran lotes/unidades libres (sin ficha asignada)
   *                   o asignados a alguna ficha del propio usuario, con la cantidad de esa cuota.
   */
  async execute(userId?: string, esAprendiz?: boolean) {
    const tenantFilter = this.tenant.isRoot ? {} : { id_sede: this.tenant.tenantId! };

    const [lotesRaw, unidades] = await Promise.all([
      this.loteRepo.find({
        where: { ...tenantFilter, cantidad_disponible: MoreThan(0) },
        relations: ['material', 'ubicacion', 'ubicacion.encargado', 'ubicacion.area'],
      }),
      this.unidadRepo.find({
        where: { ...tenantFilter, estado: EstadoUnidad.DISPONIBLE },
        relations: ['material', 'ubicacion', 'ubicacion.encargado', 'ubicacion.area'],
      }),
    ]);

    let lotes = lotesRaw.filter(
      l => !l.estado || (l.estado !== EstadoLote.VENCIDO && l.estado !== EstadoLote.DETERIORADO),
    );

    // ── Restricción por ficha (solo Aprendiz) ──────────────────────────────
    // Un lote/unidad sin ficha asignada es "libre" (visible para todos).
    // Un lote/unidad asignado a una ficha solo es visible para esa ficha,
    // y se muestra con la cantidad de su cuota (no el total del lote).
    const cantidadPorLote = new Map<string, number>();
    let unidadesFiltradas = unidades;

    if (esAprendiz && userId) {
      const fichaRows: { id_ficha: string }[] = await this.dataSource.query(
        `SELECT id_ficha FROM ficha_usuario WHERE id_usuario = $1`,
        [userId],
      );
      const misFichas = new Set(fichaRows.map(r => r.id_ficha));

      const loteIds = lotes.map(l => l.id_lote);
      const asignaciones: { id_lote: string; id_ficha: string; cantidad: number }[] = loteIds.length
        ? await this.dataSource.query(
            `SELECT id_lote, id_ficha, cantidad FROM lote_ficha WHERE id_lote = ANY($1)`,
            [loteIds],
          )
        : [];
      const lotesConAsignacion = new Set(asignaciones.map(a => a.id_lote));

      lotes = lotes.filter(l => {
        if (!lotesConAsignacion.has(l.id_lote)) return true; // libre
        const miCuota = asignaciones.find(a => a.id_lote === l.id_lote && misFichas.has(a.id_ficha));
        if (!miCuota) return false; // asignado a otra ficha
        cantidadPorLote.set(l.id_lote, Number(miCuota.cantidad));
        return true;
      });

      unidadesFiltradas = unidades.filter(u => !u.id_ficha || misFichas.has(u.id_ficha));
    }

    // Acumula disponibilidad por (material, ubicacion)
    const matUbMap = new Map<string, {
      disponible:      number;
      id_ubicacion:    string;
      ubicacion_nombre: string;
      area_nombre:     string | null;
      encargado: { id: string; nombres: string; apellidos: string; id_rol: string } | null;
    }>();

    const matInfoMap = new Map<string, {
      id_material: string; nombre: string; categoria: string;
      tipo: string; marca: string | null; modelo: string | null;
    }>();

    for (const lote of lotes) {
      if (!lote.material || !lote.ubicacion) continue;
      const key = `${lote.id_material}__${lote.id_ubicacion}`;
      if (!matUbMap.has(key)) {
        const ub = lote.ubicacion;
        matUbMap.set(key, {
          disponible:       0,
          id_ubicacion:     ub.id_ubicacion,
          ubicacion_nombre: ub.nombre,
          area_nombre:      (ub as any).area?.nombre ?? null,
          encargado:        ub.encargado
            ? { id: (ub.encargado as any).id, nombres: ub.encargado.nombres, apellidos: ub.encargado.apellidos, id_rol: ub.encargado.id_rol }
            : null,
        });
      }
      matUbMap.get(key)!.disponible += cantidadPorLote.get(lote.id_lote) ?? lote.cantidad_disponible;
      if (!matInfoMap.has(lote.id_material)) {
        const m = lote.material;
        matInfoMap.set(m.id, { id_material: m.id, nombre: m.nombre, categoria: m.categoria, tipo: m.tipo, marca: m.marca, modelo: m.modelo });
      }
    }

    for (const unidad of unidadesFiltradas) {
      if (!unidad.material || !unidad.ubicacion) continue;
      const key = `${unidad.id_material}__${unidad.id_ubicacion}`;
      if (!matUbMap.has(key)) {
        const ub = unidad.ubicacion;
        matUbMap.set(key, {
          disponible:       0,
          id_ubicacion:     ub.id_ubicacion,
          ubicacion_nombre: ub.nombre,
          area_nombre:      (ub as any).area?.nombre ?? null,
          encargado:        ub.encargado
            ? { id: (ub.encargado as any).id, nombres: ub.encargado.nombres, apellidos: ub.encargado.apellidos, id_rol: ub.encargado.id_rol }
            : null,
        });
      }
      matUbMap.get(key)!.disponible += 1;
      if (!matInfoMap.has(unidad.id_material)) {
        const m = unidad.material;
        matInfoMap.set(m.id, { id_material: m.id, nombre: m.nombre, categoria: m.categoria, tipo: m.tipo, marca: m.marca, modelo: m.modelo });
      }
    }

    // Agrupa por material
    const result: any[] = [];
    for (const [id_material, info] of matInfoMap.entries()) {
      const ubicaciones: any[] = [];
      let total_disponible = 0;
      const prefix = id_material + '__';
      for (const [key, ub] of matUbMap.entries()) {
        if (!key.startsWith(prefix)) continue;
        ubicaciones.push(ub);
        total_disponible += ub.disponible;
      }
      if (total_disponible > 0) {
        result.push({ ...info, ubicaciones, total_disponible });
      }
    }

    return result.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }
}
