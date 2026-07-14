import { IsEmail, IsNotEmpty, IsString, Length, MinLength } from 'class-validator';

export class ResetearContrasenaDto {
  @IsEmail({}, { message: 'El correo no tiene un formato válido.' })
  @IsNotEmpty()
  correo!: string;

  @IsString()
  @Length(6, 6, { message: 'El código debe tener exactamente 6 dígitos.' })
  codigo!: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
  nueva_contrasena!: string;
}
