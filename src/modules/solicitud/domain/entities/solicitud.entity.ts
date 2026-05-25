const tiposPrestamo = ['interno', 'externo'];
const estadosValidos = ['pendiente', 'aprobado', 'rechazado'];

export class Solicitud {
  constructor(
    public readonly id_solicitud: string,
    public id_solicitante: string,
    public fecha_solicitud: Date,
    public tipo_prestamo: string,
    public estado: string,
    public observaciones: string,
  ) {}

  validar(): void {
    if (!tiposPrestamo.includes(this.tipo_prestamo))
      throw new Error('Tipo de prestamo invalido');
    if (!estadosValidos.includes(this.estado))
      throw new Error('Estado invalido');
  }
}
