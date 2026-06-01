import { CredencialesUsuario } from "../entities/auth.entity";

export interface AuthRepository {
  encontrarPorCorreo(correo: string): Promise<CredencialesUsuario | null>;
  obtenerModulosPorUsuario(id_usuario: string): Promise<string[]>;
  guardarTokenReset(correo: string, token: string, expires: Date): Promise<void>;
  encontrarPorTokenReset(token: string): Promise<{ id: string; correo: string } | null>;
  actualizarContrasena(id: string, hashContrasena: string): Promise<void>;
  limpiarTokenReset(id: string): Promise<void>;
}
