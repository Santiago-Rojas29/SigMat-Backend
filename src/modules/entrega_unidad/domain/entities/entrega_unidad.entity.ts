export class EntregaUnidad {
  constructor(
    public readonly id_entrega: string,
    public readonly id_unidad: string,
  ) {}

  validar(): void {
    if (!this.id_entrega) throw new Error('El id de la entrega es obligatorio');
    if (!this.id_unidad) throw new Error('El id de la unidad es obligatorio');
  }
}
