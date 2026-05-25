import {
  IsDateString,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateEntregaDto {
  @IsString()
  @IsNotEmpty()
  id_prestamo!: string;

  @IsString()
  @IsNotEmpty()
  id_encargado!: string;

  @IsDateString()
  @IsNotEmpty()
  fecha_entrega!: string;

  @IsString()
  @IsNotEmpty()
  observaciones!: string;
}
