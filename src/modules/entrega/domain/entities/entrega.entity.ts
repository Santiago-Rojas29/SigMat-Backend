export class Entrega {
  constructor(
    public readonly id_entrega: number,
    public id_prestamo: number,
    public id_encargado: number,
    public fecha_entrega: Date,
    public observaciones: string,
  ) {}

  validar(): void {
    if (!this.fecha_entrega) throw new Error('La fecha de entrega es obligatoria');
  }
}
