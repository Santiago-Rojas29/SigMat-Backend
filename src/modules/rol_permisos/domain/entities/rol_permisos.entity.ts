export class RolPermisos {
  constructor(
    public readonly id_rol: string,
    public readonly id_permiso: string,
  ) {}

  validar(): void {
    if (!this.id_rol) throw new Error('El id de rol es obligatorio');
    if (!this.id_permiso) throw new Error('El id de permiso es obligatorio');
  }
}
