import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateSolicitudDto {
  @IsString()
  @IsNotEmpty()
  id_solicitante!: string;

  @IsDateString()
  @IsNotEmpty()
  fecha_solicitud!: string;

  @IsString()
  @IsNotEmpty()
  tipo_prestamo!: string;

  @IsString()
  @IsNotEmpty()
  estado!: string;

  @IsString()
  @IsNotEmpty()
  observaciones!: string;
}
