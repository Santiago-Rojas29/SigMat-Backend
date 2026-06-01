import { IsOptional, IsString } from 'class-validator';

export class RechazarSolicitudDto {
  @IsOptional()
  @IsString()
  motivo_rechazo?: string;
}
