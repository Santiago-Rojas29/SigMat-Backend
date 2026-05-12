export class SolicitudLote {
  constructor(
    public readonly id_solicitud: number,
    public readonly id_lote: number,
    public cantidad_solicitada: number,
    public id_usuario: number,
  ) {}

  validar(): void {
    if (this.cantidad_solicitada <= 0) throw new Error('La cantidad solicitada debe ser mayor a 0');
  }
}
