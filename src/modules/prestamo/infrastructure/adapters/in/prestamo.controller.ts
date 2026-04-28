import { Controller, Post, Body } from '@nestjs/common';
import { CreatePrestamoUseCase } from '../../../application/use-cases/create-prestamo.use-case';

@Controller('prestamo')
export class PrestamoController {
  constructor(private readonly createUseCase: CreatePrestamoUseCase) {}

  @Post()
  create(@Body() body: { id: string; name: string }) {
    return this.createUseCase.execute(body);
  }
}
