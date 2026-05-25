export class Centro {
  constructor(
    public readonly id: string,
    public name: string,
    public ciudad: string,
    public direccion: string,
    public telefono: string,
    public estado: string,
  ) {}

  validar(): void {
    if (!this.name) throw new Error('El nombre es obligatorio');
    if (!this.ciudad) throw new Error('La ciudad es obligatoria');
    if (!this.direccion) throw new Error('La direccion es obligatoria');
    if (!this.telefono) throw new Error('El telefono es obligatorio');
    if (!this.estado) throw new Error('El estado es obligatorio');
  }
}
