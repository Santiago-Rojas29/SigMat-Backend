import { Injectable , Inject} from "@nestjs/common";
import type{ DevolucionRepository } from "../../domain/ports/devolucion.repository";
import { Devolucion } from "../../domain/entities/devolucion.entity";


@Injectable()
export class ObtenerPorIdDevoluvionUseCase{
    constructor(@Inject('DevolucionRepository')
    private readonly repo: DevolucionRepository

    ){}

    async execute(id:string):Promise<Devolucion | null>{
        return await this.repo.obtenerPorID(id)


    }
}