export class SolicitudUnidad {
  constructor(
    public readonly id_solicitud: number,
    public readonly id_unidad: number,
    public id_usuario: number,
  ) {}

  validar(): void {
    if (!this.id_solicitud) throw new Error('La solicitud es obligatoria');
    if (!this.id_unidad) throw new Error('La unidad es obligatoria');
  }
}
