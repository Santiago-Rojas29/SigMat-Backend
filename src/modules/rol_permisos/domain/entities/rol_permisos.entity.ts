export class RolPermisos {
  constructor(
    public readonly id: string,
    public readonly id_rol: string,
    public readonly id_permiso: string,
    public submodulo: string,
    public acciones: string[],
  ) {}

  validar(): void {
    if (!this.id_rol)     throw new Error('El id_rol es obligatorio');
    if (!this.id_permiso) throw new Error('El id_permiso es obligatorio');
  }

  esModuloCompleto(): boolean {
    return this.submodulo === '';
  }

  aplicaA(submodulo: string): boolean {
    return this.esModuloCompleto() || this.submodulo === submodulo;
  }

  tieneAccion(accion: string): boolean {
    return this.acciones.length === 0 || this.acciones.includes(accion);
  }
}
