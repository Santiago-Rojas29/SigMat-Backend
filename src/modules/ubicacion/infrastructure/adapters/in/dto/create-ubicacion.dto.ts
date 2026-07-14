import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUbicacionDto {
  @IsString()
  @IsNotEmpty()
  id_area!: string;

  @IsString()
  @IsNotEmpty()
  id_tipo_ubicacion!: string;

  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  descripcion!: string;

  @IsString()
  @IsNotEmpty()
  estado!: string;

  @IsOptional()
  @Transform(({ value }) => value === '' ? null : value)
  @IsUUID()
  id_encargado?: string | null;
}
