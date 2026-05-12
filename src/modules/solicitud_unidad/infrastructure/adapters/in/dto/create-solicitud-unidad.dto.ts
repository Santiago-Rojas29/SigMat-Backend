import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSolicitudUnidadDto {
  @IsNumber()
  @IsNotEmpty()
  id_solicitud!: number;

  @IsNumber()
  @IsNotEmpty()
  id_unidad!: number;

  @IsNumber()
  @IsNotEmpty()
  id_usuario!: number;
}
