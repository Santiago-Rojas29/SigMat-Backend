const estadosValidos = ['disponible', 'prestado', 'danado', 'en mantenimiento', 'perdido'];

export class Unidad {
  constructor(
    public readonly id_unidad: number,
    public id_material: number,
    public id_responsable: number,
    public id_ubicacion: number,
    public codigo_unidad: string,
    public estado: string,
  ) {}

  validar(): void {
    if (!this.codigo_unidad) throw new Error('El codigo de unidad es obligatorio');
    if (!estadosValidos.includes(this.estado)) throw new Error('Estado invalido');
  }
}
