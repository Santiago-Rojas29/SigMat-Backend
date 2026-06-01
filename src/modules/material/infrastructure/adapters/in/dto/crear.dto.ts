import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { CategoriaMaterial } from '../../../../domain/entities/material.entity';

export class CrearMaterialDto {
  @IsString()
  @IsNotEmpty()
  id_ficha!: string;

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

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  marca!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  modelo!: string;

  @IsString()
  @IsNotEmpty()
  descripcion!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  codigo_unspsc!: string;

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
