const nombresValidos = ['bodega', 'laboratorio', 'aula'];

export class TipoUbicacion {
  constructor(
    public readonly id_tipo_ubicacion: string,
    public nombre: string,
    public descripcion: string,
  ) {}

  validar(): void {
    if (!nombresValidos.includes(this.nombre))
      throw new Error('Nombre de tipo de ubicacion invalido');
  }
}
