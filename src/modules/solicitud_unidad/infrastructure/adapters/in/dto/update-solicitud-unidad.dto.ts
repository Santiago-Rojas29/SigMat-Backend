import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateSolicitudUnidadDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_usuario: string;
}
