import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateEntregaDto {
  @IsNumber()
  @IsNotEmpty()
  id_prestamo!: number;

  @IsNumber()
  @IsNotEmpty()
  id_encargado!: number;

  @IsDateString()
  @IsNotEmpty()
  fecha_entrega!: string;

  @IsString()
  @IsNotEmpty()
  observaciones!: string;
}
