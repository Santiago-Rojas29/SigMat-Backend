import { IsString, MinLength } from 'class-validator';

export class CambiarContrasenaDto {
  @IsString()
  contrasena_actual: string;

  @IsString()
  @MinLength(6)
  nueva_contrasena: string;
}
