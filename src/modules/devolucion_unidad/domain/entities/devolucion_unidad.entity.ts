export enum CondicionDevolucionUnidad {
  BUENO = 'bueno',
  DANADO = 'danado',
  INCOMPLETO = 'incompleto',
}

export class DevolucionUnidad {
  constructor(
    public readonly id_devolucion: string,
    public readonly id_unidad: string,
    public condicion_devolucion: CondicionDevolucionUnidad,
  ) {}

  validar(): void {
    if (!this.id_devolucion) throw new Error('El id de devolucion es obligatorio');
    if (!this.id_unidad) throw new Error('El id de unidad es obligatorio');
    if (!Object.values(CondicionDevolucionUnidad).includes(this.condicion_devolucion))
      throw new Error('La condicion de devolucion no es valida');
  }
}
