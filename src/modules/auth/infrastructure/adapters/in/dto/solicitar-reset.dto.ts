import { IsEmail, IsNotEmpty } from 'class-validator';

export class SolicitarResetDto {
  @IsEmail({}, { message: 'El correo no tiene un formato válido.' })
  @IsNotEmpty()
  correo!: string;
}
