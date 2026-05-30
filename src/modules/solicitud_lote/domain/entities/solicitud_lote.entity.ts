export class SolicitudLote {
  constructor(
    public readonly id_solicitud: string,
    public readonly id_lote: string,
    public cantidad_solicitada: number,
    public id_usuario: string,
  ) {}

  validar(): void {
    if (this.cantidad_solicitada <= 0) throw new Error('La cantidad solicitada debe ser mayor a 0');
  }
}
