import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Relacion } from './rebac.decorator';

@Injectable()
export class RebacService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  /**
   * Punto de entrada principal del motor REBAC.
   * Despacha la verificación según el tipo de relación declarada.
   */
  async verificar(
    relacion: Relacion,
    userId: string,
    resourceId: string,
  ): Promise<boolean> {
    switch (relacion) {
      case Relacion.VER_SOLICITUD:
        return this.puedeVerSolicitud(userId, resourceId);
      case Relacion.APROBAR_COMO_INSTRUCTOR:
        return this.esInstructorDeSolicitud(userId, resourceId);
      case Relacion.ES_MIEMBRO_FICHA:
        return this.esMiembroDeFicha(userId, resourceId);
      case Relacion.ES_INSTRUCTOR_FICHA:
        return this.esInstructorDeFicha(userId, resourceId);
      default:
        return false;
    }
  }

  // ── Relaciones sobre Solicitud ───────────────────────────────────────────

  /**
   * Un usuario puede ver una solicitud si es:
   * - el aprendiz/instructor que la creó (id_solicitante), o
   * - el instructor asignado para aprobarla (id_instructor).
   */
  private async puedeVerSolicitud(
    userId: string,
    solicitudId: string,
  ): Promise<boolean> {
    const rows = await this.dataSource.query(
      `SELECT 1 FROM solicitud
       WHERE id_solicitud = $1
         AND (id_solicitante = $2 OR id_instructor = $2)
       LIMIT 1`,
      [solicitudId, userId],
    );
    return rows.length > 0;
  }

  /**
   * Solo el instructor explícitamente asignado a la solicitud
   * puede ejecutar la aprobación de instructor.
   */
  private async esInstructorDeSolicitud(
    userId: string,
    solicitudId: string,
  ): Promise<boolean> {
    const rows = await this.dataSource.query(
      `SELECT 1 FROM solicitud
       WHERE id_solicitud = $1 AND id_instructor = $2
       LIMIT 1`,
      [solicitudId, userId],
    );
    return rows.length > 0;
  }

  // ── Relaciones sobre Ficha ───────────────────────────────────────────────

  /**
   * Verifica que el usuario pertenece a la ficha con cualquier rol
   * (instructor o aprendiz).
   */
  private async esMiembroDeFicha(
    userId: string,
    fichaId: string,
  ): Promise<boolean> {
    const rows = await this.dataSource.query(
      `SELECT 1 FROM ficha_usuario
       WHERE id_ficha = $1 AND id_usuario = $2
       LIMIT 1`,
      [fichaId, userId],
    );
    return rows.length > 0;
  }

  /**
   * Verifica que el usuario es instructor (no aprendiz) de la ficha.
   */
  private async esInstructorDeFicha(
    userId: string,
    fichaId: string,
  ): Promise<boolean> {
    const rows = await this.dataSource.query(
      `SELECT 1 FROM ficha_usuario
       WHERE id_ficha = $1 AND id_usuario = $2 AND rol_en_ficha = 'instructor'
       LIMIT 1`,
      [fichaId, userId],
    );
    return rows.length > 0;
  }

  // ── Bypass por permiso de módulo ─────────────────────────────────────────

  /**
   * Verifica si el usuario tiene permiso sobre alguno de los módulos dados,
   * ya sea por su rol o por asignación directa.
   * Los usuarios con permisos de administración/control pasan el check REBAC.
   */
  async tienePermisoDeModulo(
    userId: string,
    modulos: string[],
  ): Promise<boolean> {
    const rows = await this.dataSource.query(
      `SELECT 1 FROM usuario u
       JOIN rol_permisos rp ON rp.id_rol = u.id_rol
       JOIN permisos p ON p.id = rp.id_permiso
       WHERE u.id = $1 AND p.modulo = ANY($2::text[])
       LIMIT 1`,
      [userId, modulos],
    );
    return rows.length > 0;
  }
}
