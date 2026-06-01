import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class EntregarSolicitudDto {
  @IsString()
  @IsNotEmpty()
  id_bodega!: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'fecha_limite debe tener formato YYYY-MM-DD' })
  fecha_limite?: string;

  @IsString()
  @IsOptional()
  observaciones?: string;
}
