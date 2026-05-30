export enum ModuloPermiso {
  MATERIALES = 'materiales',
  PRESTAMOS = 'prestamos',
  INVENTARIO = 'inventario',
  USUARIOS = 'usuarios',
  UBICACIONES = 'ubicaciones',
}

export class Permisos {
  constructor(
    public readonly id: string,
    public nombre: string,
    public descripcion: string,
    public modulo: ModuloPermiso,
  ) {}

  validar(): void {
    if (!this.nombre) throw new Error('El nombre es obligatorio');
    if (!this.descripcion) throw new Error('La descripcion es obligatoria');
    if (!Object.values(ModuloPermiso).includes(this.modulo))
      throw new Error('El modulo no es valido');
  }
}
