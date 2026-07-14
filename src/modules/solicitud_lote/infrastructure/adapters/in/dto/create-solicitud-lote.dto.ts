import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSolicitudLoteDto {
  @IsString()
  @IsNotEmpty()
  id_solicitud!: string;

  @IsString()
  @IsNotEmpty()
  id_lote!: string;

  @IsNumber()
  @IsNotEmpty()
  cantidad_solicitada!: number;

  @IsString()
  @IsNotEmpty()
  id_usuario!: string;
}
