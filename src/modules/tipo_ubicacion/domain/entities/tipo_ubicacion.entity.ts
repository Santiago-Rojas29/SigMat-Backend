export class TipoUbicacion {
  constructor(
    public readonly id_tipo_ubicacion: string,
    public nombre: string,
    public descripcion: string,
  ) {}

  validar(): void {
    if (!this.nombre) throw new Error('El nombre es obligatorio');
    if (!this.descripcion) throw new Error('La descripción es obligatoria');
  }
}
