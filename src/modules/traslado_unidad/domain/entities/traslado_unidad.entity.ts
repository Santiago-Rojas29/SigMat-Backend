export class TrasladoUnidad {
  constructor(
    public readonly id_traslado: string,
    public readonly id_unidad: string,
  ) {}

  validar(): void {
    if (!this.id_traslado) throw new Error('El id de traslado es obligatorio');
    if (!this.id_unidad) throw new Error('El id de unidad es obligatorio');
  }
}
