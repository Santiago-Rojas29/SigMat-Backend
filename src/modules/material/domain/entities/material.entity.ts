export enum CategoriaMaterial {
  CONSUMIBLE    = 'consumible',
  NO_CONSUMIBLE = 'no consumible',
  PERECEDERO    = 'perecedero',
}

export class Material {
  constructor(
    public readonly id: string,
    public nombre: string,
    public categoria: CategoriaMaterial,
    public tipo: string,
    public marca: string | null,
    public modelo: string | null,
    public descripcion: string,
    public codigo_unspsc: string,
    public unidad_medida: string | null,
  ) {}

  validar(): void {
    if (!this.nombre)        throw new Error('El nombre es obligatorio');
    if (!Object.values(CategoriaMaterial).includes(this.categoria))
      throw new Error('La categoria no es valida');
    if (!this.tipo)          throw new Error('El tipo es obligatorio');
    if (!this.descripcion)   throw new Error('La descripcion es obligatoria');
    if (!this.codigo_unspsc) throw new Error('El codigo UNSPSC es obligatorio');

    if (this.categoria === CategoriaMaterial.NO_CONSUMIBLE) {
      if (!this.modelo) throw new Error('El modelo es obligatorio para materiales no consumibles');
    }

    if (
      this.categoria === CategoriaMaterial.CONSUMIBLE ||
      this.categoria === CategoriaMaterial.PERECEDERO
    ) {
      if (!this.unidad_medida) throw new Error('La unidad de medida es obligatoria para consumibles y perecederos');
    }
  }
}
