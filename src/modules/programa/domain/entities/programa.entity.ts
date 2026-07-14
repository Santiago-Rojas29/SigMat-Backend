const estadosValidos = ['activo', 'inactivo'];
const nivelesFormacion = ['tecnico', 'tecnologo', 'complementaria'];

export class Programa {
  constructor(
    public readonly id_programa: string,
    public id_area: string,
    public nombre: string,
    public codigo_programa: string,
    public nivel_formacion: string,
    public estado: string,
  ) { }

  validar(): void {
    if (!this.nombre) throw new Error('El nombre es obligatorio');
    if (!this.codigo_programa) throw new Error('El codigo del programa es obligatorio');
    if (!nivelesFormacion.includes(this.nivel_formacion))
      throw new Error('Nivel de formacion invalido');
    if (!estadosValidos.includes(this.estado))
      throw new Error('Estado invalido');
  }
}
