export class Entrega {
  constructor(
    public readonly id_entrega: string,
    public id_prestamo: string,
    public id_encargado: string,
    public fecha_entrega: Date,
    public observaciones: string,
  ) {}

  validar(): void {
    if (!this.fecha_entrega) throw new Error('La fecha de entrega es obligatoria');
  }
}
