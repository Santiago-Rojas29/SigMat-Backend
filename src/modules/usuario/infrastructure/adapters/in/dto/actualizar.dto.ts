import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { TipoDocumento, EstadoUsuario } from '../../../../domain/entities/usuario.entity';

export class ActualizarUsuarioDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_rol?: string;

  @IsOptional()
  @IsEnum(TipoDocumento)
  tipo_documento?: TipoDocumento;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  numero_documento?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombres?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  apellidos?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  correo?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  telefono?: string;

  @IsOptional()
  @IsEnum(EstadoUsuario)
  estado?: EstadoUsuario;
}
