import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFichaUsuarioDto {
  @IsString()
  @IsNotEmpty()
  id_ficha!: string;

  @IsString()
  @IsNotEmpty()
  id_usuario!: string;

  @IsString()
  @IsNotEmpty()
  rol_en_ficha!: string;
}
