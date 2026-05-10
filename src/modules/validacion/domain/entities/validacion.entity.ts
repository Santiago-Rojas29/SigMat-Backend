export enum DecisionValidacion {
  APROBADO = 'aprobado',
  RECHAZADO = 'rechazado',
}

export class Validacion {
  constructor(
    public readonly id: string,
    public id_solicitud: string,
    public id_validador: string,
    public fecha_validacion: Date,
    public decision: DecisionValidacion,
    public observaciones: string,
  ) {}

  validar(): void {
    if (!this.id_solicitud) throw new Error('La solicitud es obligatoria');
    if (!this.id_validador) throw new Error('El validador es obligatorio');
    if (!this.fecha_validacion) throw new Error('La fecha de validacion es obligatoria');
    if (!Object.values(DecisionValidacion).includes(this.decision)) throw new Error('Decision invalida');
  }
}
