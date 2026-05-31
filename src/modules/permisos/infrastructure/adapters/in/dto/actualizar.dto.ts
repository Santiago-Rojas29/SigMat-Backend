import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ModuloPermiso } from '../../../../domain/entities/permisos.entity';

export class ActualizarPermisosDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nombre?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  descripcion?: string;

  @IsOptional()
  @IsEnum(ModuloPermiso)
  modulo?: ModuloPermiso;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  submodulos?: string[];
}
