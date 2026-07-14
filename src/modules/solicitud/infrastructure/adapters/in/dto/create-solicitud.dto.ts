import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TipoFlujo, TipoPrestamo } from '../../../../domain/entities/solicitud.entity';

export class CreateSolicitudDto {
  @IsString()
  @IsNotEmpty()
  id_solicitante!: string;

  @IsEnum(TipoFlujo)
  tipo_flujo!: TipoFlujo;

  @IsEnum(TipoPrestamo)
  tipo_prestamo!: TipoPrestamo;

  @IsOptional()
  @IsString()
  id_instructor?: string;

  @IsOptional()
  @IsString()
  id_bodega?: string;

  @IsOptional()
  @IsString()
  observaciones?: string;
}
