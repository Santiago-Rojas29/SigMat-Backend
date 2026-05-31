import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ModuloPermiso } from '../../../../domain/entities/permisos.entity';

export class CrearPermisosDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  descripcion!: string;

  @IsEnum(ModuloPermiso)
  modulo!: ModuloPermiso;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  submodulos?: string[];
}
