import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { CategoriaMaterial } from '../../../../domain/entities/material.entity';

export class CrearMaterialDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  nombre!: string;

  @IsEnum(CategoriaMaterial)
  categoria!: CategoriaMaterial;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  tipo!: string;

  @IsOptional()
  @Transform(({ value }) => value === '' ? null : value)
  @IsString()
  @MaxLength(50)
  marca?: string | null;

  @IsOptional()
  @Transform(({ value }) => value === '' ? null : value)
  @IsString()
  @MaxLength(50)
  modelo?: string | null;

  @IsString()
  @IsNotEmpty()
  descripcion!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  codigo_unspsc!: string;

  @IsOptional()
  @Transform(({ value }) => value === '' ? null : value)
  @IsString()
  @MaxLength(30)
  unidad_medida?: string | null;
}
