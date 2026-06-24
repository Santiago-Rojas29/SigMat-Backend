export interface CredencialesUsuario {
    id: string;
    correo: string;
    contrasena: string;
    id_rol: string;
    nombres: string;
    apellidos: string;
    estado: string;
    id_sede: string | null;
}