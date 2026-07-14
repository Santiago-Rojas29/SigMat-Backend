import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateFichaUsuarioDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  rol_en_ficha?: string;
}
