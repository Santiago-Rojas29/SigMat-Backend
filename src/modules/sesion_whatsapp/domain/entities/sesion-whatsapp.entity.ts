export class SesionWhatsapp {
  constructor(
    public telefono: string,
    public token: string | null,
    public paso: string,
    public correo: string | null,
    public id_usuario: string | null,
    public nombres: string | null,
    public apellidos: string | null,
    public id_rol: string | null,
    public nombre_rol: string | null,
    public acciones_inventario: string[] | null,
    public actualizado_en: Date,
  ) {}
}
