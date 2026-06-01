import { IsArray, IsString } from 'class-validator';

export class ActualizarSubmodulosDto {
  @IsArray()
  @IsString({ each: true })
  submodulos!: string[];
}
