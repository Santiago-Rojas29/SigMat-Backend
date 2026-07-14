export enum TipoMovimiento {
  ENTRADA = 'entrada',
  SALIDA = 'salida',
  AJUSTE = 'ajuste',
  TRASLADO = 'traslado',
}

export class Kardex {
  constructor(
    public readonly id: string,
    public tipo_movimiento: TipoMovimiento,
    public cantidad: number,
    public fecha_movimiento: Date,
    public saldo: number,
    public id_unidad: string | null,
    public id_lote: string | null,
    public id_entrega: string | null,
    public id_devolucion: string | null,
    public id_traslado: string | null,
    public id_incidencia: string | null,
  ) {}

  validar(): void {
    if (!Object.values(TipoMovimiento).includes(this.tipo_movimiento))
      throw new Error('El tipo de movimiento no es valido');
    if (this.cantidad == null || this.cantidad <= 0)
      throw new Error('La cantidad debe ser mayor a cero');
    if (!this.fecha_movimiento || isNaN(new Date(this.fecha_movimiento).getTime()))
      throw new Error('La fecha de movimiento no es valida');
    if (this.saldo == null || this.saldo < 0)
      throw new Error('El saldo no puede ser negativo');
  }
}
