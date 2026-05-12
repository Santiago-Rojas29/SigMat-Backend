import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateSolicitudDto {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  id_solicitante?: number;

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
