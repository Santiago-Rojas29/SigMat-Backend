import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { EstadoLote } from '../../../../domain/entities/lote.entity';

export class CreateLoteDto {
  @IsString()
  @IsNotEmpty()
  id_material!: string;

  @IsString()
  @IsNotEmpty()
  id_responsable!: string;

  @IsString()
  @IsNotEmpty()
  id_ubicacion!: string;

  @IsString()
  @IsNotEmpty()
  codigo_lote!: string;

  @IsNumber()
  @IsNotEmpty()
  cantidad_inicial!: number;

  @IsNumber()
  @IsNotEmpty()
  cantidad_disponible!: number;

  @IsString()
  @IsNotEmpty()
  unidad_medida!: string;

  @IsDateString()
  @IsNotEmpty()
  fecha_entrada!: string;

  @IsOptional()
  @IsDateString()
  fecha_ingreso?: string;

  @IsOptional()
  @IsDateString()
  fecha_vencimiento?: string;

  @IsOptional()
  @IsEnum(EstadoLote)
  estado?: EstadoLote;
}
