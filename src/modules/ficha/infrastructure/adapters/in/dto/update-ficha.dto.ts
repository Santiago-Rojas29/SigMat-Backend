import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateFichaDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_programa?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  codigo_ficha?: string;

  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  fecha_inicio?: string;

  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  fecha_fin?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  jornada?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  estado?: string;
}
