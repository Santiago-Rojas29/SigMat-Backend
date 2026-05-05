const estadosValidos = ['activo', 'finalizado'];

export class Prestamo {
  constructor(
    public readonly id: string,
    public id_validacion: string,
    public fecha_limite: Date,
    public estado: string,
  ) {}

  validar(): void {
    if (!this.id_validacion) throw new Error('La validacion es obligatoria');
    if (!this.fecha_limite) throw new Error('La fecha limite es obligatoria');
    if (this.fecha_limite < new Date()) throw new Error('La fecha limite no puede ser pasada');
    if (!estadosValidos.includes(this.estado)) throw new Error('Estado invalido');
  }
}
