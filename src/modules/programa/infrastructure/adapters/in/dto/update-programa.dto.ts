import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateProgramaDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_area?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nombre?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  codigo_programa?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nivel_formacion?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  estado?: string;
}
