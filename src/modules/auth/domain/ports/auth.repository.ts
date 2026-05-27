import { CredencialesUsuario } from "../entities/auth.entity";

export interface AuthRepository {
  encontrarPorCorreo(correo: string): Promise<CredencialesUsuario | null>;
  obtenerModulosPorRol(id_rol: string): Promise<string[]>;
}
