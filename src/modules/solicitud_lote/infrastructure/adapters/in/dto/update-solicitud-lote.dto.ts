import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class UpdateSolicitudLoteDto {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  cantidad_solicitada?: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  id_usuario?: number;
}
