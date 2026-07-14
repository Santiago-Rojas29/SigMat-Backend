import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AsignarRolPermisosDto {
  @IsString()
  @IsNotEmpty()
  id_rol!: string;

  @IsString()
  @IsNotEmpty()
  id_permiso!: string;

  // '' o ausente = módulo completo; valor específico = solo ese submódulo
  @IsOptional()
  @IsString()
  submodulo?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  acciones?: string[];
}
