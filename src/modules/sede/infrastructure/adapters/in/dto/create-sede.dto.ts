import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSedeDto {
  @IsNumber()
  @IsNotEmpty()
  id_centro!: number;

  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  direccion!: string;

  @IsString()
  @IsNotEmpty()
  telefono!: string;

  @IsString()
  @IsNotEmpty()
  estado!: string;
}
