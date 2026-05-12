import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUnidadDto {
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
  codigo_unidad?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  estado?: string;
}
