export enum TipoDocumento {
  CC = 'cc',
  TI = 'ti',
  CE = 'ce',
  PASAPORTE = 'pasaporte',
}

export enum EstadoUsuario {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
}

export class Usuario {
  constructor(
    public readonly id: string,
    public id_rol: string,
    public tipo_documento: TipoDocumento,
    public numero_documento: string,
    public nombres: string,
    public apellidos: string,
    public correo: string,
    public telefono: string,
    public estado: EstadoUsuario,
  ) {}

  validar(): void {
    if (!this.id_rol) throw new Error('El id de rol es obligatorio');
    if (!Object.values(TipoDocumento).includes(this.tipo_documento))
      throw new Error('El tipo de documento no es valido');
    if (!this.numero_documento) throw new Error('El numero de documento es obligatorio');
    if (!this.nombres) throw new Error('Los nombres son obligatorios');
    if (!this.apellidos) throw new Error('Los apellidos son obligatorios');
    if (!this.correo) throw new Error('El correo es obligatorio');
    if (!this.telefono) throw new Error('El telefono es obligatorio');
    if (!Object.values(EstadoUsuario).includes(this.estado))
      throw new Error('El estado no es valido');
  }
}
