const estadosValidos = ['activo', 'inactivo'];

export class Ubicacion {
  constructor(
    public readonly id_ubicacion: string,
    public id_area: string,
    public id_tipo_ubicacion: string,
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
