const estadosValidos = ['activo', 'inactivo'];

export class Area {
  constructor(
    public readonly id_area: string,
    public id_sede: string,
    public id_usuario: string,
    public nombre: string,
    public descripcion: string,
    public estado: string,
  ) { }

  validar(): void {
    if (!this.nombre) throw new Error('El nombre es obligatorio');
    if (!estadosValidos.includes(this.estado))
      throw new Error('Estado invalido');
  }
}
