import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAreaDto {
  @IsNumber()
  @IsNotEmpty()
  id_sede!: number;

  @IsNumber()
  @IsNotEmpty()
  id_usuario!: number;

  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  descripcion!: string;

  @IsString()
  @IsNotEmpty()
  estado!: string;
}
