export enum CategoriaMaterial {
  CONSUMIBLE = 'consumible',
  NO_CONSUMIBLE = 'no consumible',
}

export class Material {
  constructor(
    public readonly id: string,
    public id_ficha: string,
    public nombre: string,
    public categoria: CategoriaMaterial,
    public tipo: string,
    public marca: string,
    public modelo: string,
    public descripcion: string,
    public codigo_unspsc: string,
  ) {}

  validar(): void {
    if (!this.id_ficha) throw new Error('El id de ficha es obligatorio');
    if (!this.nombre) throw new Error('El nombre es obligatorio');
    if (!Object.values(CategoriaMaterial).includes(this.categoria))
      throw new Error('La categoria no es valida');
    if (!this.tipo) throw new Error('El tipo es obligatorio');
    if (!this.marca) throw new Error('La marca es obligatoria');
    if (!this.modelo) throw new Error('El modelo es obligatorio');
    if (!this.descripcion) throw new Error('La descripcion es obligatoria');
    if (!this.codigo_unspsc) throw new Error('El codigo UNSPSC es obligatorio');
  }
}
