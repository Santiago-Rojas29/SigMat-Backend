import { IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';

export class CrearLoteFichaDto {
  @IsUUID()
  @IsNotEmpty()
  id_lote!: string;

  @IsString()
  @IsNotEmpty()
  id_ficha!: string;

  @IsNumber()
  @Min(1)
  cantidad!: number;
}
