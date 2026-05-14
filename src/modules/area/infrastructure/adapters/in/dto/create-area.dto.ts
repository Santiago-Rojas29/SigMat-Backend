import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAreaDto {
  @IsString()
  @IsNotEmpty()
  id_sede!: string;

  @IsString()
  @IsNotEmpty()
  id_usuario!: string;

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
