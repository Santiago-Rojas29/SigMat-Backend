export class Traslado {
  constructor(
    public readonly id: string,
    public id_responsable: string,
    public id_ubicacion_origen: string,
    public id_ubicacion_destino: string,
    public fecha_traslado: Date,
    public motivo: string,
    public observaciones: string,
  ) {}

  validar(): void {
    if (!this.id_responsable) throw new Error('El id del responsable es obligatorio');
    if (!this.id_ubicacion_origen) throw new Error('El id de ubicacion origen es obligatorio');
    if (!this.id_ubicacion_destino) throw new Error('El id de ubicacion destino es obligatorio');
    if (!this.fecha_traslado || isNaN(new Date(this.fecha_traslado).getTime()))
      throw new Error('La fecha de traslado no es valida');
    if (!this.motivo) throw new Error('El motivo es obligatorio');
    if (!this.observaciones) throw new Error('Las observaciones son obligatorias');
  }
}
