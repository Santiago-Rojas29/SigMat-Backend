import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFichaUsuarioDto {
  @IsNumber()
  @IsNotEmpty()
  id_ficha!: number;

  @IsNumber()
  @IsNotEmpty()
  id_usuario!: number;

  @IsString()
  @IsNotEmpty()
  rol_en_ficha!: string;
}
