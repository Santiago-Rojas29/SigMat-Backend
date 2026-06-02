import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSolicitudAprendizDto {
  @IsString()
  @IsNotEmpty()
  id_solicitud!: string;

  @IsString()
  @IsNotEmpty()
  id_aprendiz!: string;
}
