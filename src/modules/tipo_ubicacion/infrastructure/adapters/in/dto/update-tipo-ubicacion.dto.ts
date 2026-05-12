import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateTipoUbicacionDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nombre?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  descripcion?: string;
}
