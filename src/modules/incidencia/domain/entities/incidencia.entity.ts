export enum TipoIncidencia {
  DANO = 'dano',
  PERDIDA = 'perdida',
  MANTENIMIENTO = 'mantenimiento',
}

export enum EstadoIncidencia {
  ABIERTA = 'abierta',
  EN_PROCESO = 'en proceso',
  CERRADA = 'cerrada',
}

export class Incidencia {
  constructor(
    public readonly id: string,
    public id_unidad: string,
    public id_usuario: string,
    public tipo: TipoIncidencia,
    public fecha_incidencia: Date,
    public descripcion: string,
    public estado: EstadoIncidencia,
  ) {}

  validar(): void {
    if (!this.id_unidad) throw new Error('El id de unidad es obligatorio');
    if (!this.id_usuario) throw new Error('El id de usuario es obligatorio');
    if (!Object.values(TipoIncidencia).includes(this.tipo))
      throw new Error('El tipo de incidencia no es valido');
    if (!this.fecha_incidencia || isNaN(new Date(this.fecha_incidencia).getTime()))
      throw new Error('La fecha de incidencia no es valida');
    if (!this.descripcion) throw new Error('La descripcion es obligatoria');
    if (!Object.values(EstadoIncidencia).includes(this.estado))
      throw new Error('El estado de incidencia no es valido');
  }
}
