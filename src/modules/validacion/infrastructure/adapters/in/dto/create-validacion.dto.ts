import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { DecisionValidacion } from 'src/modules/validacion/domain/entities/validacion.entity';

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

  @IsString()
  @IsNotEmpty()
  decision!: DecisionValidacion;

  @IsString()
  @IsNotEmpty()
  observaciones!: string;
}
