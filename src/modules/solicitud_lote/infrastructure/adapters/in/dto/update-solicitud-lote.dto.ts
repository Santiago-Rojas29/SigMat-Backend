import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateSolicitudLoteDto {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  cantidad_solicitada?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_usuario: string;
}
