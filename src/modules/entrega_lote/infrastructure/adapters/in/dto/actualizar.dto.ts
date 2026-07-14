import { IsInt, IsOptional, Min } from 'class-validator';

export class ActualizarEntregaLoteDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  cantidad_entregada?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  cantidad_devuelta?: number;
}
