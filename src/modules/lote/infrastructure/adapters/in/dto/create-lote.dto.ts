import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateLoteDto {
  @IsNumber()
  @IsNotEmpty()
  id_material!: number;

  @IsNumber()
  @IsNotEmpty()
  id_responsable!: number;

  @IsNumber()
  @IsNotEmpty()
  id_ubicacion!: number;

  @IsString()
  @IsNotEmpty()
  codigo_lote!: string;

  @IsNumber()
  @IsNotEmpty()
  cantidad_inicial!: number;

  @IsNumber()
  @IsNotEmpty()
  cantidad_disponible!: number;

  @IsString()
  @IsNotEmpty()
  unidad_medida!: string;

  @IsDateString()
  @IsNotEmpty()
  fecha_entrada!: string;
}
