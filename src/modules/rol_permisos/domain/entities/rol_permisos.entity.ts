export class RolPermisos {
  constructor(
    public readonly id: string,
    public readonly id_rol: string,
    public readonly id_permiso: string,
    public submodulos: string[],
    public acciones: string[],
  ) {}

  validar(): void {
    if (!this.id_rol)     throw new Error('El id_rol es obligatorio');
    if (!this.id_permiso) throw new Error('El id_permiso es obligatorio');
  }

  tieneAccesoCompleto(): boolean {
    return this.submodulos.length === 0;
  }

  tieneSubmodulo(submodulo: string): boolean {
    return this.tieneAccesoCompleto() || this.submodulos.includes(submodulo);
  }

  tieneAccion(accion: string): boolean {
    return this.acciones.includes(accion);
  }
}
