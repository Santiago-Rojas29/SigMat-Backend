import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ActualizarRolDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    nombre?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    descripcion?: string;
}
