import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class UpdateSolicitudUnidadDto {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  id_usuario?: number;
}
