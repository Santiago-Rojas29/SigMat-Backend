import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { DecisionValidacion } from '../../../../domain/entities/validacion.entity';

export class UpdateValidacionDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_solicitud?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_validador?: string;

  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  fecha_validacion?: string;

  @IsOptional()
  @IsEnum(DecisionValidacion)
  decision?: DecisionValidacion;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  observaciones?: string;
}
