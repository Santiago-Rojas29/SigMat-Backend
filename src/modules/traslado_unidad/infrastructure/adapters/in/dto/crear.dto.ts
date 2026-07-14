import { IsNotEmpty, IsString } from 'class-validator';

export class CrearTrasladoUnidadDto {
  @IsString()
  @IsNotEmpty()
  id_traslado!: string;

  @IsString()
  @IsNotEmpty()
  id_unidad!: string;
}
