const estadosValidos = ['activo', 'inactivo'];

export class Sede {
  constructor(
    public readonly id_sede: string,
    public id_centro: string,
    public nombre: string,
    public direccion: string,
    public telefono: string,
    public estado: string,
  ) { }

  validar(): void {
    if (!this.nombre) throw new Error('El nombre es obligatorio');
    if (!this.direccion) throw new Error('La direccion es obligatoria');
    if (!this.telefono) throw new Error('El telefono es obligatorio');
    if (!estadosValidos.includes(this.estado))
      throw new Error('Estado invalido');
  }
}
