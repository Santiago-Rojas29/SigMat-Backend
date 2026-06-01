import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { CategoriaMaterial } from '../../../../domain/entities/material.entity';

export class ActualizarMaterialDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_ficha?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  nombre?: string;

  @IsOptional()
  @IsEnum(CategoriaMaterial)
  categoria?: CategoriaMaterial;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  tipo?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  marca?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  modelo?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  descripcion?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  codigo_unspsc?: string;

  @IsOptional()
  @Transform(({ value }) => value === '' ? undefined : value)
  @IsString()
  @MaxLength(30)
  unidad_medida?: string;

  @IsOptional()
  @Transform(({ value }) => value === '' ? undefined : value)
  @IsDateString()
  fecha_vencimiento?: string;
}
