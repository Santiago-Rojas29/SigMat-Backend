import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProgramaDto {
  @IsString()
  @IsNotEmpty()
  id_area!: string;

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
