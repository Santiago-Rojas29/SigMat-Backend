import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateSedeDto {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  id_centro?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nombre?: string;

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
