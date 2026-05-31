export class UsuarioPermisos {
  constructor(
    public readonly id: string,
    public readonly id_usuario: string,
    public readonly id_permiso: string,
    public submodulos: string[],
  ) {}

  validar(): void {
    if (!this.id_usuario) throw new Error('El id_usuario es obligatorio');
    if (!this.id_permiso) throw new Error('El id_permiso es obligatorio');
  }

  tieneAccesoCompleto(): boolean {
    return this.submodulos.length === 0;
  }

  tieneSubmodulo(submodulo: string): boolean {
    return this.tieneAccesoCompleto() || this.submodulos.includes(submodulo);
  }
}
