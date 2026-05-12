import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateEntregaDto {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  id_prestamo?: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  id_encargado?: number;

  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  fecha_entrega?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  observaciones?: string;
}
