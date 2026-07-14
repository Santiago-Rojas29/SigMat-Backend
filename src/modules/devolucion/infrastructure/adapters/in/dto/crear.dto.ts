import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CondicionDevolucion } from '../../../../domain/entities/devolucion.entity';

export class CrearDevolucionDto {
    @IsString()
    @IsNotEmpty()
    id_entrega!: string;

    @IsDateString()
    @IsNotEmpty()
    fecha_devolucion!: string;

    @IsEnum(CondicionDevolucion)
    condicion!: CondicionDevolucion;

    @IsString()
    @IsNotEmpty()
    observaciones!: string;
}
