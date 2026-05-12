import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CrearTrasladoDto {
  @IsString()
  @IsNotEmpty()
  id_responsable!: string;

  @IsString()
  @IsNotEmpty()
  id_ubicacion_origen!: string;

  @IsString()
  @IsNotEmpty()
  id_ubicacion_destino!: string;

  @IsDateString()
  @IsNotEmpty()
  fecha_traslado!: string;

  @IsString()
  @IsNotEmpty()
  motivo!: string;

  @IsString()
  @IsNotEmpty()
  observaciones!: string;
}
