export class LoteFicha {
  constructor(
    public readonly id: string,
    public id_lote:     string,
    public id_ficha:    string,
    public cantidad:    number,
  ) {}

  validar(): void {
    if (!this.id_lote)        throw new Error('El lote es obligatorio');
    if (!this.id_ficha)       throw new Error('La ficha es obligatoria');
    if (this.cantidad <= 0)   throw new Error('La cantidad debe ser mayor a 0');
  }
}
