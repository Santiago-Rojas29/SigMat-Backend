export class Rol {
  constructor(
    public readonly id: string,
    public nombre: string,
    public descripcion: string,
  ) {}

  validar(): void {
    if (!this.nombre) throw new Error('El nombre es obligatorio');
    if (!this.descripcion) throw new Error('La descripcion es obligatoria');
  }
}
