import { Transform } from 'class-transformer';
import { IsArray, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class UpsertSesionWhatsappDto {
  @IsOptional()
  @IsString()
  token?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  paso?: string;

  @IsOptional()
  @Transform(({ value }) => (value === '' ? null : value))
  @IsString()
  @MaxLength(100)
  correo?: string | null;

  @IsOptional()
  @IsUUID()
  id_usuario?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  nombres?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  apellidos?: string | null;

  @IsOptional()
  @IsUUID()
  id_rol?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  nombre_rol?: string | null;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  acciones_inventario?: string[] | null;
}
