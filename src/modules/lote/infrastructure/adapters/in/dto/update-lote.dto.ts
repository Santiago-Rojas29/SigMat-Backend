import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateLoteDto {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  id_material?: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  id_responsable?: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  id_ubicacion?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  codigo_lote?: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  cantidad_inicial?: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  cantidad_disponible?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  unidad_medida?: string;

  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  fecha_entrada?: string;
}
