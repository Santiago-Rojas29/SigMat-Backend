import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateEntregaDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_prestamo?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_encargado?: string;

  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  fecha_entrega?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  observaciones?: string;
}
