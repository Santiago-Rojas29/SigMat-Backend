import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUbicacionDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_area?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_tipo_ubicacion?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nombre?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  descripcion?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  estado?: string;

  @IsOptional()
  @Transform(({ value }) => value === '' ? null : value)
  @IsUUID()
  id_encargado?: string | null;
}
