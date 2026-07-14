import { Injectable,Inject } from "@nestjs/common";
import type { DevolucionRepository } from "../../domain/ports/devolucion.repository";
import { Devolucion } from "../../domain/entities/devolucion.entity";



@Injectable()
export class ObtenerTodosDevolucionUseCase{
    constructor(@Inject('DevolucionRepository')
    private readonly repo:DevolucionRepository
    ){}

    async execute():Promise<Devolucion[]>{
        return await this.repo.obtenerTodos()
    }
}