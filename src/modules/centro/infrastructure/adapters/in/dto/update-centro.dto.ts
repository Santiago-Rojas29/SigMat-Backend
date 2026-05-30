import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdateCentroDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nombre?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  ciudad?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  direccion?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  telefono?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  estado?: string;
}
