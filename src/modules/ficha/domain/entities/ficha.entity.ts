const jornadasValidas = ['manana', 'tarde', 'nocturna'];
const estadosValidos = ['en formacion', 'terminada', 'cancelada'];

export class Ficha {
  constructor(
    public readonly id_ficha: number,
    public id_programa: number,
    public codigo_ficha: string,
    public fecha_inicio: Date,
    public fecha_fin: Date,
    public jornada: string,
    public estado: string,
  ) {}

  validar(): void {
    if (!this.codigo_ficha) throw new Error('El codigo de ficha es obligatorio');
    if (!this.fecha_inicio) throw new Error('La fecha de inicio es obligatoria');
    if (!this.fecha_fin) throw new Error('La fecha de fin es obligatoria');
    if (this.fecha_fin < this.fecha_inicio)
      throw new Error('La fecha de fin no puede ser anterior a la fecha de inicio');
    if (!jornadasValidas.includes(this.jornada))
      throw new Error('Jornada invalida');
    if (!estadosValidos.includes(this.estado))
      throw new Error('Estado invalido');
  }
}
