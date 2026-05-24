import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
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
}
