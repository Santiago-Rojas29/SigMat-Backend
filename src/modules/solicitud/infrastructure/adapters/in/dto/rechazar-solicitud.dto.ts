import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RolRechazador } from '../../../../application/use-cases/rechazar-solicitud.use-case';

export class RechazarSolicitudDto {
  @IsEnum(RolRechazador)
  @IsNotEmpty()
  rol!: RolRechazador;

  @IsOptional()
  @IsString()
  motivo_rechazo?: string;
}
