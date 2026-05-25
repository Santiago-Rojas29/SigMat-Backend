import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateAreaDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_sede?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_usuario?: string;

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
