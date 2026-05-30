export class EntregaLote {
  constructor(
    public readonly id_entrega: string,
    public readonly id_lote: string,
    public cantidad_entregada: number,
    public cantidad_devuelta: number,
  ) {}

  validar(): void {
    if (!this.id_entrega) throw new Error('El id de la entrega es obligatorio');
    if (!this.id_lote) throw new Error('El id del lote es obligatorio');
    if (this.cantidad_entregada <= 0) throw new Error('La cantidad entregada debe ser mayor a 0');
    if (this.cantidad_devuelta < 0) throw new Error('La cantidad devuelta no puede ser negativa');
  }
}
