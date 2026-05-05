import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateValidacionDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_solicitud?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_validador?: string;

  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  fecha_validacion?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  decision?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  observaciones?: string;
}
