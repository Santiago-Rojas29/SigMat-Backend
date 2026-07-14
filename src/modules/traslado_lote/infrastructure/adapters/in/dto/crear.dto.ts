import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CrearTrasladoLoteDto {
  @IsString()
  @IsNotEmpty()
  id_traslado!: string;

  @IsString()
  @IsNotEmpty()
  id_lote!: string;

  @IsInt()
  @IsPositive()
  cantidad_trasladada!: number;
}
