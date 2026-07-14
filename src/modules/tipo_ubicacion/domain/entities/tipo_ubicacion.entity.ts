export class TipoUbicacion {
  constructor(
    public readonly id_tipo_ubicacion: string,
    public nombre: string,
    public descripcion: string,
    public id_sede: string | null = null,
  ) {}

  validar(): void {
    if (!this.nombre) throw new Error('El nombre es obligatorio');
    if (!this.descripcion) throw new Error('La descripción es obligatoria');
  }
}
