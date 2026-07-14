export enum TipoFlujo {
  INSTRUCTOR = 'instructor',
  APRENDIZ   = 'aprendiz',
}

export enum TipoPrestamo {
  INTERNO = 'interno',
  EXTERNO = 'externo',
}

export enum EstadoSolicitud {
  PENDIENTE_INSTRUCTOR = 'pendiente_instructor',
  PENDIENTE_ADMIN      = 'pendiente_admin',
  PENDIENTE_BODEGA     = 'pendiente_bodega',
  APROBADO             = 'aprobado',
  ENTREGADO            = 'entregado',
  RECHAZADO            = 'rechazado',
  CANCELADO            = 'cancelado',
}

export class Solicitud {
  constructor(
    public readonly id_solicitud:              string,
    public id_solicitante:                     string,
    public tipo_flujo:                         TipoFlujo,
    public tipo_prestamo:                      TipoPrestamo,
    public estado:                             EstadoSolicitud,
    public id_instructor:                      string | null,
    public id_admin:                           string | null,
    public id_bodega:                          string | null,
    public observaciones:                      string | null,
    public motivo_rechazo:                     string | null,
    public fecha_solicitud:                    Date,
    public fecha_respuesta_instructor:         Date | null,
    public fecha_respuesta_admin:              Date | null,
    public fecha_respuesta_bodega:             Date | null,
    public fecha_entrega:                      Date | null,
  ) {}

  validar(): void {
    if (!Object.values(TipoFlujo).includes(this.tipo_flujo))
      throw new Error('Tipo de flujo inválido');
    if (!Object.values(TipoPrestamo).includes(this.tipo_prestamo))
      throw new Error('Tipo de préstamo inválido');
    if (this.tipo_flujo === TipoFlujo.APRENDIZ && !this.id_instructor)
      throw new Error('Un aprendiz debe indicar su instructor');
    if (this.tipo_flujo === TipoFlujo.INSTRUCTOR && !this.id_bodega)
      throw new Error('Un instructor debe indicar el responsable de bodega');
  }
}
