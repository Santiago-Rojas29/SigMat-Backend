const rolesValidos = ['instructor', 'aprendiz'];

export class FichaUsuario {
  constructor(
    public readonly id_ficha: number,
    public readonly id_usuario: number,
    public rol_en_ficha: string,
  ) {}

  validar(): void {
    if (!rolesValidos.includes(this.rol_en_ficha))
      throw new Error('Rol en ficha invalido');
  }
}
