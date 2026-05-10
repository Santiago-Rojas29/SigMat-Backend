import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { DecisionValidacion } from '../../../../domain/entities/validacion.entity';

export class CreateValidacionDto {
  @IsString()
  @IsNotEmpty()
  id_solicitud!: string;

  @IsString()
  @IsNotEmpty()
  id_validador!: string;

  @IsDateString()
  @IsNotEmpty()
  fecha_validacion!: string;

  @IsEnum(DecisionValidacion)
  decision!: DecisionValidacion;

  @IsString()
  @IsNotEmpty()
  observaciones!: string;
}
