import { IsArray, IsString } from 'class-validator';

export class ActualizarRolPermisosDto {
  @IsArray()
  @IsString({ each: true })
  acciones!: string[];
}
