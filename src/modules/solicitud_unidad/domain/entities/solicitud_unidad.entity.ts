export class SolicitudUnidad {
  constructor(
    public readonly id_solicitud: string,
    public readonly id_unidad: string,
    public id_usuario: string,
  ) {}

  validar(): void {
    if (!this.id_solicitud) throw new Error('La solicitud es obligatoria');
    if (!this.id_unidad) throw new Error('La unidad es obligatoria');
  }
}
