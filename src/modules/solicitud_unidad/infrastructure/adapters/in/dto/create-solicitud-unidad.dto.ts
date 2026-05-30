import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSolicitudUnidadDto {
  @IsString()
  @IsNotEmpty()
  id_solicitud!: string;

  @IsString()
  @IsNotEmpty()
  id_unidad!: string;

  @IsString()
  @IsNotEmpty()
  id_usuario!: string;
}
