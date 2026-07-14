import {
  IsDateString,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateFichaDto {
  @IsString()
  @IsNotEmpty()
  id_programa!: string;

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
