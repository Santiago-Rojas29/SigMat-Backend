import { SetMetadata } from '@nestjs/common';

export const REBAC_KEY = 'rebac_relacion';

/**
 * Relaciones definidas en el modelo REBAC de SigMat.
 * Cada valor representa una relación usuario → recurso específico.
 */
export enum Relacion {
  /** El usuario es el solicitante o el instructor asignado a la solicitud */
  VER_SOLICITUD           = 'VER_SOLICITUD',
  /** El usuario es el instructor asignado específicamente a esta solicitud */
  APROBAR_COMO_INSTRUCTOR = 'APROBAR_COMO_INSTRUCTOR',
  /** El usuario pertenece a la ficha (como instructor o aprendiz) */
  ES_MIEMBRO_FICHA        = 'ES_MIEMBRO_FICHA',
  /** El usuario tiene el rol 'instructor' dentro de la ficha */
  ES_INSTRUCTOR_FICHA     = 'ES_INSTRUCTOR_FICHA',
}

/**
 * Marca un endpoint con la relación REBAC requerida.
 * El RebacGuard leerá este metadato y verificará la relación
 * entre el usuario autenticado y el recurso solicitado.
 *
 * @example
 * @Get(':id')
 * @UseGuards(JwtAuthGuard, RebacGuard)
 * @RequiereRelacion(Relacion.VER_SOLICITUD)
 * obtenerPorId(@Param('id') id: string) { ... }
 */
export const RequiereRelacion = (relacion: Relacion) =>
  SetMetadata(REBAC_KEY, relacion);
