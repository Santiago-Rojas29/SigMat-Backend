const unidadesMedida = ['kg', 'l', 'm', 'unidad', 'paquete'];

export class Lote {
  constructor(
    public readonly id_lote: number,
    public id_material: number,
    public id_responsable: number,
    public id_ubicacion: number,
    public codigo_lote: string,
    public cantidad_inicial: number,
    public cantidad_disponible: number,
    public unidad_medida: string,
    public fecha_entrada: Date,
  ) {}

  validar(): void {
    if (!this.codigo_lote) throw new Error('El codigo de lote es obligatorio');
    if (this.cantidad_inicial <= 0) throw new Error('La cantidad inicial debe ser mayor a 0');
    if (this.cantidad_disponible < 0) throw new Error('La cantidad disponible no puede ser negativa');
    if (!unidadesMedida.includes(this.unidad_medida)) throw new Error('Unidad de medida invalida');
  }
}
