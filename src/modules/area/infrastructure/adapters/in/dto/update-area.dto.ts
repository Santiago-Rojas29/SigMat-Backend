import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateAreaDto {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  id_sede?: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  id_usuario?: number;

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
