import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CondicionDevolucionUnidad } from '../../../../domain/entities/devolucion_unidad.entity';

export class CrearDevolucionUnidadDto {
  @IsString()
  @IsNotEmpty()
  id_devolucion!: string;

  @IsString()
  @IsNotEmpty()
  id_unidad!: string;

  @IsEnum(CondicionDevolucionUnidad)
  condicion_devolucion!: CondicionDevolucionUnidad;
}
