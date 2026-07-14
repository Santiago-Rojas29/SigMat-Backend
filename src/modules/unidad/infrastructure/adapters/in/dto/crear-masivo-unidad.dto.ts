import { IsArray, ValidateNested, ArrayMinSize, ArrayMaxSize } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUnidadDto } from './create-unidad.dto';

export class CrearMasivoUnidadDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  @ValidateNested({ each: true })
  @Type(() => CreateUnidadDto)
  unidades: CreateUnidadDto[];
}
