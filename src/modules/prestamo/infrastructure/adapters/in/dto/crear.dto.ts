import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { EstadoPrestamo } from '../../../../domain/entities/prestamo.entity';

export class CreatePrestamoDto {
  @IsString()
  @IsNotEmpty()
  id_validacion!: string;

  @IsDateString()
  @IsNotEmpty()
  fecha_limite!: string;

  @IsEnum(EstadoPrestamo)
  estado!: EstadoPrestamo;
}
