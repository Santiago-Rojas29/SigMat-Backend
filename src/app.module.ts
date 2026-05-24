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
import { TrasladoLoteModule } from './modules/traslado_lote/traslado_lote.module';
import { KardexModule } from './modules/kardex/kardex.module';
import { IncidenciaModule } from './modules/incidencia/incidencia.module';
import { RolModule } from './modules/rol/rol.module';
import { RolPermisosModule } from './modules/rol_permisos/rol_permisos.module';
import { PermisosModule } from './modules/permisos/permisos.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { MaterialModule } from './modules/material/material.module';
import { AuthModule } from './modules/auth/auth.module';

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
    TrasladoLoteModule,
    KardexModule,
    IncidenciaModule,
    RolModule,
    RolPermisosModule,
    PermisosModule,
    UsuarioModule,
    MaterialModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
