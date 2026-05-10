import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ActualizarTrasladoDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_responsable?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_ubicacion_origen?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_ubicacion_destino?: string;

  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  fecha_traslado?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  motivo?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  observaciones?: string;
}
