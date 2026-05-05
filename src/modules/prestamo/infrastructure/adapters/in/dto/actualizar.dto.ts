import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePrestamoDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_validacion?: string;

  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  fecha_limite?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  estado?: string;
}
