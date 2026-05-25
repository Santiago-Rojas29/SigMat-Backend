const estadosValidos = ['disponible', 'prestado', 'danado', 'en mantenimiento', 'perdido'];

export class Unidad {
  constructor(
    public readonly id_unidad: string,
    public id_material: string,
    public id_responsable: string,
    public id_ubicacion: string,
    public codigo_unidad: string,
    public estado: string,
  ) {}

  validar(): void {
    if (!this.codigo_unidad) throw new Error('El codigo de unidad es obligatorio');
    if (!estadosValidos.includes(this.estado)) throw new Error('Estado invalido');
  }
}
