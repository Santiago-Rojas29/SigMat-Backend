import { IsNumber, Min } from 'class-validator';

export class ActualizarLoteFichaDto {
  @IsNumber()
  @Min(1)
  cantidad!: number;
}
