import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSolicitudLoteDto {
  @IsNumber()
  @IsNotEmpty()
  id_solicitud!: number;

  @IsNumber()
  @IsNotEmpty()
  id_lote!: number;

  @IsNumber()
  @IsNotEmpty()
  cantidad_solicitada!: number;

  @IsNumber()
  @IsNotEmpty()
  id_usuario!: number;
}
