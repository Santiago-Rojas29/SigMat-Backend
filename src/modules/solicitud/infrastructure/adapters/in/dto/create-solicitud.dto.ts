import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateSolicitudDto {
  @IsNumber()
  @IsNotEmpty()
  id_solicitante!: number;

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
