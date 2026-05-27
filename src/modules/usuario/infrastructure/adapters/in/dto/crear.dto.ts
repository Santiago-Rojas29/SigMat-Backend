import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { TipoDocumento, EstadoUsuario } from '../../../../domain/entities/usuario.entity';

export class CrearUsuarioDto {
  @IsString()
  @IsNotEmpty()
  id_rol!: string;

  @IsEnum(TipoDocumento)
  tipo_documento!: TipoDocumento;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  numero_documento!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombres!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  apellidos!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  correo!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  telefono!: string;

  @IsEnum(EstadoUsuario)
  estado!: EstadoUsuario;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  contrasena!: string;
}
