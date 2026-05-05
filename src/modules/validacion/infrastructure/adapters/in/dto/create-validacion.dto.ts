import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateValidacionDto{
    @IsString()
    @IsNotEmpty()
    id_solicitud!:string

    @IsString()
    @IsNotEmpty()
    id_validador!:string

    @IsDateString()
    @IsNotEmpty()
    fecha_validacion!:string

    @IsString()
    @IsNotEmpty()
    decision!:string

    @IsString()
    @IsNotEmpty()
    observaciones!:string


}