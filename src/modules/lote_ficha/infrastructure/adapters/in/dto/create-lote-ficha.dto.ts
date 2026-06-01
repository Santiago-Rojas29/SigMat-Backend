import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateLoteFichaDto {
  @IsString()
  @IsNotEmpty()
  id_lote!: string;

  @IsString()
  @IsNotEmpty()
  id_ficha!: string;

  @IsInt()
  @IsPositive()
  cantidad!: number;
}
