import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { EstadoLote } from '../../../../domain/entities/lote.entity';

export class UpdateLoteDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_material: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_responsable: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_ubicacion: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  codigo_lote?: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  cantidad_inicial?: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  cantidad_disponible?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  unidad_medida?: string;

  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  fecha_entrada?: string;

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
