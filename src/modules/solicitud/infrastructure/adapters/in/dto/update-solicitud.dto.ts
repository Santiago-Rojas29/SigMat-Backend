import { IsOptional, IsString } from 'class-validator';

export class UpdateSolicitudDto {
  @IsOptional()
  @IsString()
  observaciones?: string;
}
