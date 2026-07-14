import {
  IsArray, IsDateString, IsIn, IsInt, IsNotEmpty,
  IsOptional, IsString, IsUUID, Min, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ItemTrasladoDto {
  @IsIn(['unidad', 'lote'])
  tipo!: 'unidad' | 'lote';

  @IsUUID()
  @IsNotEmpty()
  id!: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  cantidad?: number;
}

export class RealizarTrasladoDto {
  @IsUUID()
  @IsNotEmpty()
  id_responsable!: string;

  @IsString()
  @IsNotEmpty()
  id_ubicacion_origen!: string;

  @IsString()
  @IsNotEmpty()
  id_ubicacion_destino!: string;

  @IsDateString()
  @IsNotEmpty()
  fecha_traslado!: string;

  @IsString()
  @IsNotEmpty()
  motivo!: string;

  @IsString()
  @IsNotEmpty()
  observaciones!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemTrasladoDto)
  items!: ItemTrasladoDto[];
}
