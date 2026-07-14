import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EstadoPrestamo } from '../../../../domain/entities/prestamo.entity';

export class UpdatePrestamoDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_usuario?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_validacion?: string;

  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  fecha_limite?: string;

  @IsOptional()
  @IsEnum(EstadoPrestamo)
  estado?: EstadoPrestamo;
}
