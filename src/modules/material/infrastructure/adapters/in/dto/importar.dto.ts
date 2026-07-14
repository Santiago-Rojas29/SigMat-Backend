import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CrearMaterialDto } from './crear.dto';

export class ImportarMaterialesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CrearMaterialDto)
  materiales!: CrearMaterialDto[];
}
