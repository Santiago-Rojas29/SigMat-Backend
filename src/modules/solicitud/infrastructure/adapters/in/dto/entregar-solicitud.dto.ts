import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EntregarSolicitudDto {
  @IsString()
  @IsNotEmpty()
  id_bodega!: string;

  @IsOptional()
  @IsString()
  fecha_limite?: string;

  @IsString()
  @IsOptional()
  observaciones?: string;
}
