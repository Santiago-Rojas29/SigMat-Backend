import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TipoIncidencia, EstadoIncidencia } from '../../../../domain/entities/incidencia.entity';

export class ActualizarIncidenciaDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_unidad?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_usuario?: string;

  @IsOptional()
  @IsEnum(TipoIncidencia)
  tipo?: TipoIncidencia;

  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  fecha_incidencia?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  descripcion?: string;

  @IsOptional()
  @IsEnum(EstadoIncidencia)
  estado?: EstadoIncidencia;
}
