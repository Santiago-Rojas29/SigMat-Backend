import { IsNotEmpty, IsString } from 'class-validator';

export class CrearRolPermisosDto {
  @IsString()
  @IsNotEmpty()
  id_rol!: string;

  @IsString()
  @IsNotEmpty()
  id_permiso!: string;
}
