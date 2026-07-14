import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';
import { TipoMovimiento } from '../../../../domain/entities/kardex.entity';

export class CrearKardexDto {
  @IsEnum(TipoMovimiento)
  tipo_movimiento!: TipoMovimiento;

  @IsInt()
  @IsPositive()
  cantidad!: number;

  @IsDateString()
  @IsNotEmpty()
  fecha_movimiento!: string;

  @IsInt()
  saldo!: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_unidad?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_lote?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_entrega?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_devolucion?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_traslado?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_incidencia?: string;
}
