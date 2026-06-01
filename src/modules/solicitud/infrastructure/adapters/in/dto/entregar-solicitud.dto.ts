import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EntregarSolicitudDto {
  @IsString()
  @IsNotEmpty()
  id_bodega!: string;

  @IsDateString()
  @IsNotEmpty()
  fecha_limite!: string;

  @IsString()
  @IsOptional()
  observaciones?: string;
}
