import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateFichaDto {
  @IsNumber()
  @IsNotEmpty()
  id_programa!: number;

  @IsString()
  @IsNotEmpty()
  codigo_ficha!: string;

  @IsDateString()
  @IsNotEmpty()
  fecha_inicio!: string;

  @IsDateString()
  @IsNotEmpty()
  fecha_fin!: string;

  @IsString()
  @IsNotEmpty()
  jornada!: string;

  @IsString()
  @IsNotEmpty()
  estado!: string;
}
