import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

/**
 * `tipo_ubicacion` no tenía `id_sede` — la tabla completa era visible/editable
 * desde cualquier sede. Al agregar la columna, esta migración asigna cada tipo
 * existente a la sede que realmente lo usa (vía sus `ubicacion`); si más de una
 * sede distinta comparte el mismo tipo, duplica el registro por sede y repunta
 * esas ubicaciones a la copia correspondiente. Idempotente — solo toca filas
 * con `id_sede` aún NULL.
 */
@Injectable()
export class TipoUbicacionMigrationService implements OnModuleInit {
  private readonly logger = new Logger('TipoUbicacionMigration');

  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async onModuleInit() {
    try {
      const tipos: { id_tipo_ubicacion: string }[] = await this.dataSource.query(
        `SELECT id_tipo_ubicacion FROM tipo_ubicacion WHERE id_sede IS NULL`,
      );

      for (const tipo of tipos) {
        const sedes: { id_sede: string | null }[] = await this.dataSource.query(
          `SELECT DISTINCT id_sede FROM ubicacion WHERE id_tipo_ubicacion = $1`,
          [tipo.id_tipo_ubicacion],
        );
        const distintas = sedes.map(s => s.id_sede).filter((s): s is string => s !== null);

        if (distintas.length === 0) continue; // nadie lo usa aún — se deja NULL

        const [primera, ...resto] = distintas;
        await this.dataSource.query(
          `UPDATE tipo_ubicacion SET id_sede = $1 WHERE id_tipo_ubicacion = $2`,
          [primera, tipo.id_tipo_ubicacion],
        );

        for (const sede of resto) {
          const [{ nombre, descripcion }] = await this.dataSource.query(
            `SELECT nombre, descripcion FROM tipo_ubicacion WHERE id_tipo_ubicacion = $1`,
            [tipo.id_tipo_ubicacion],
          );
          const [{ id_tipo_ubicacion: nuevoId }] = await this.dataSource.query(
            `INSERT INTO tipo_ubicacion (id_tipo_ubicacion, nombre, descripcion, id_sede)
             VALUES (gen_random_uuid(), $1, $2, $3)
             RETURNING id_tipo_ubicacion`,
            [nombre, descripcion, sede],
          );
          await this.dataSource.query(
            `UPDATE ubicacion SET id_tipo_ubicacion = $1 WHERE id_tipo_ubicacion = $2 AND id_sede = $3`,
            [nuevoId, tipo.id_tipo_ubicacion, sede],
          );
        }
      }

      if (tipos.length > 0) this.logger.log(`Revisados ${tipos.length} tipo(s) de ubicación para asignar sede`);
    } catch (e) {
      this.logger.error(`Error migrando tipo_ubicacion: ${e}`);
    }
  }
}
