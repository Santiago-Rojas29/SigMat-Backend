import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AsignarRolPermisosDto {
  @IsString()
  @IsNotEmpty()
  id_rol!: string;

  @IsString()
  @IsNotEmpty()
  id_permiso!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  submodulos?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  acciones?: string[];
}
