import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

/**
 * Explota las filas legadas de rol_permisos (una fila con `submodulos: string[]`
 * compartiendo `acciones` entre todos) en una fila por submódulo con su propia
 * columna `submodulo` — cada una conserva las mismas `acciones` que tenía la fila
 * original, preservando el comportamiento actual hasta que se editen manualmente.
 *
 * Idempotente: tras procesar una fila, su `submodulos` queda en '{}', así que
 * una segunda ejecución no la vuelve a tocar.
 */
@Injectable()
export class RolPermisosMigrationService implements OnModuleInit {
  private readonly logger = new Logger('RolPermisosMigration');

  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async onModuleInit() {
    try {
      const rows: { id: string; id_rol: string; id_permiso: string; submodulos: string[]; acciones: string[] }[] =
        await this.dataSource.query(
          `SELECT id, id_rol, id_permiso, submodulos, acciones
           FROM rol_permisos
           WHERE array_length(submodulos, 1) > 0`,
        );

      if (rows.length === 0) return;

      for (const row of rows) {
        const [primero, ...resto] = row.submodulos;

        await this.dataSource.query(
          `UPDATE rol_permisos SET submodulo = $1, submodulos = '{}' WHERE id = $2`,
          [primero, row.id],
        );

        for (const sub of resto) {
          await this.dataSource.query(
            `INSERT INTO rol_permisos (id, id_rol, id_permiso, submodulo, acciones, submodulos)
             VALUES (gen_random_uuid(), $1, $2, $3, $4, '{}')`,
            [row.id_rol, row.id_permiso, sub, row.acciones],
          );
        }
      }

      this.logger.log(`Migradas ${rows.length} fila(s) de rol_permisos a submódulo granular`);
    } catch (e) {
      this.logger.error(`Error migrando rol_permisos: ${e}`);
    }
  }
}
