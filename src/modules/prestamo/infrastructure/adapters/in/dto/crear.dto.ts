import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreatePrestamoDto {
  @IsString()
  @IsNotEmpty()
  id_validacion!: string;

  @IsDateString()
  @IsNotEmpty()
  fecha_limite!: string;

  @IsString()
  @IsNotEmpty()
  estado!: string;
}
