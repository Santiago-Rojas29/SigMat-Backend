export class SolicitudAprendiz {
  constructor(
    public readonly id_solicitud: string,
    public readonly id_aprendiz: string,
  ) {}

  validar(): void {
    if (!this.id_solicitud) throw new Error('La solicitud es obligatoria');
    if (!this.id_aprendiz) throw new Error('El aprendiz es obligatorio');
  }
}
