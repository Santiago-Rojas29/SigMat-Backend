import { Controller, Post, Body } from '@nestjs/common';
import { CreateValidacionUseCase } from '../../../application/use-cases/create-validacion.use-case';

@Controller('validacion')
export class ValidacionController {
  constructor(private readonly createUseCase: CreateValidacionUseCase) {}

  @Post()
  create(@Body() body: { id: string; name: string }) {
    return this.createUseCase.execute(body);
  }
}
