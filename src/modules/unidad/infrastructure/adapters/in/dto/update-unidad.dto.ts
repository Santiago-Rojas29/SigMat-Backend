import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUnidadDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_material?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_responsable?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_ubicacion?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  codigo_unidad?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  estado?: string;

  @IsOptional()
  @IsString()
  id_ficha?: string | null;
}
