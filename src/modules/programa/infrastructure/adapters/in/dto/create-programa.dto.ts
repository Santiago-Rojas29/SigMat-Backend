import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProgramaDto {
  @IsNumber()
  @IsNotEmpty()
  id_area!: number;

  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  codigo_programa!: string;

  @IsString()
  @IsNotEmpty()
  nivel_formacion!: string;

  @IsString()
  @IsNotEmpty()
  estado!: string;
}
