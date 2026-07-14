import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class UpdateLoteFichaDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  cantidad?: number;
}
