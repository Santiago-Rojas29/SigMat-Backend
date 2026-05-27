import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateSolicitudDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_solicitante?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_ficha?: string;

  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  fecha_solicitud?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  tipo_prestamo?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  estado?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  observaciones?: string;
}
