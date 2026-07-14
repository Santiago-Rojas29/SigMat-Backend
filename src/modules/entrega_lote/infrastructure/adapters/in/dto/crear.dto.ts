import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CrearEntregaLoteDto {
  @IsString()
  @IsNotEmpty()
  id_entrega!: string;

  @IsString()
  @IsNotEmpty()
  id_lote!: string;

  @IsInt()
  @Min(1)
  cantidad_entregada!: number;

  @IsInt()
  @Min(0)
  cantidad_devuelta!: number;
}
