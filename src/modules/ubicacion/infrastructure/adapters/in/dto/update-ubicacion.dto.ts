import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

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
}
