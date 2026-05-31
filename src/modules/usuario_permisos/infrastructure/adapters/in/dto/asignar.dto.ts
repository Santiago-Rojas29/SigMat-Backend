import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class AsignarPermisoDto {
  @IsUUID()
  @IsNotEmpty()
  id_usuario!: string;

  @IsUUID()
  @IsNotEmpty()
  id_permiso!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  submodulos?: string[];
}
