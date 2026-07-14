import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TipoIncidencia, EstadoIncidencia } from '../../../../domain/entities/incidencia.entity';

export class CrearIncidenciaDto {
  @IsString()
  @IsNotEmpty()
  id_unidad!: string;

  @IsString()
  @IsNotEmpty()
  id_usuario!: string;

  @IsEnum(TipoIncidencia)
  tipo!: TipoIncidencia;

  @IsDateString()
  @IsNotEmpty()
  fecha_incidencia!: string;

  @IsString()
  @IsNotEmpty()
  descripcion!: string;

  @IsEnum(EstadoIncidencia)
  estado!: EstadoIncidencia;
}
