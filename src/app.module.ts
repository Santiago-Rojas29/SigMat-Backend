import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrestamoModule } from './modules/prestamo/prestamo.module';
import { ValidacionModule } from './modules/validacion/validacion.module';
import { EntregaUnidadModule } from './modules/entrega_unidad/entrega_unidad.module';
import { EntregaLoteModule } from './modules/entrega_lote/entrega_lote.module';
import { DevolucionModule } from './modules/devolucion/devolucion.module';
import { DevolucionUnidadModule } from './modules/devolucion_unidad/devolucion_unidad.module';
import { TrasladoModule } from './modules/traslado/traslado.module';
import { TrasladoUnidadModule } from './modules/traslado_unidad/traslado_unidad.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public')
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    PrestamoModule,
    ValidacionModule,
    EntregaUnidadModule,
    EntregaLoteModule,
    DevolucionModule,
    DevolucionUnidadModule,
    TrasladoModule,
    TrasladoUnidadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
