import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CondicionDevolucion } from '../../../../domain/entities/devolucion.entity';

export class ActualizarDevolucionDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_entrega?: string;

  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  fecha_devolucion?: string;

  @IsOptional()
  @IsEnum(CondicionDevolucion)
  condicion?: CondicionDevolucion;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  observaciones?: string;
}
