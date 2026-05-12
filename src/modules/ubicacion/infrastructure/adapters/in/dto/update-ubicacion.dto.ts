import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUbicacionDto {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  id_area?: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  id_tipo_ubicacion?: number;

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
