export enum CondicionDevolucion {
  BUENO = 'bueno',
  DAÑADO = 'dañado',
  INCOMPLETO = 'incompleto',
}

export class Devolucion {
  constructor(
    public readonly id: string,
    public id_entrega: string,
    public fecha_devolucion: Date,
    public condicion: CondicionDevolucion,
    public observaciones: string,
  ) {}

  validar(): void {
    if (!this.id_entrega) throw new Error('El id de entrega es obligatorio');
    if (!this.fecha_devolucion) throw new Error('La fecha de devolucion es obligatoria');
    const fecha = new Date(this.fecha_devolucion);
    if (isNaN(fecha.getTime())) throw new Error('La fecha de devolucion no es valida');
    const fechaDia = fecha.toISOString().slice(0, 10);
    const hoyDia   = new Date().toISOString().slice(0, 10);
    if (fechaDia < hoyDia) throw new Error('La fecha de devolucion no puede ser pasada');
    if (!Object.values(CondicionDevolucion).includes(this.condicion)) throw new Error('La condicion no es valida');
  }
}
