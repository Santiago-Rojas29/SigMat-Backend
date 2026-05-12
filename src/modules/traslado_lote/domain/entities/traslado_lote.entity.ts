export class TrasladoLote {
  constructor(
    public readonly id_traslado: string,
    public readonly id_lote: string,
    public cantidad_trasladada: number,
  ) {}

  validar(): void {
    if (!this.id_traslado) throw new Error('El id de traslado es obligatorio');
    if (!this.id_lote) throw new Error('El id de lote es obligatorio');
    if (this.cantidad_trasladada == null || this.cantidad_trasladada <= 0)
      throw new Error('La cantidad trasladada debe ser mayor a cero');
  }
}
