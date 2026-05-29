import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PrestamoModule } from './modules/prestamo/prestamo.module';
import { ValidacionModule } from './modules/validacion/validacion.module';
import { CentroModule } from './modules/centro/centro.module';
import { EntregaUnidadModule } from './modules/entrega_unidad/entrega_unidad.module';
import { EntregaLoteModule } from './modules/entrega_lote/entrega_lote.module';
import { EntregaModule } from './modules/entrega/entrega.module';
import { DevolucionModule } from './modules/devolucion/devolucion.module';
import { DevolucionUnidadModule } from './modules/devolucion_unidad/devolucion_unidad.module';
import { TrasladoModule } from './modules/traslado/traslado.module';
import { TrasladoUnidadModule } from './modules/traslado_unidad/traslado_unidad.module';
import { TrasladoLoteModule } from './modules/traslado_lote/traslado_lote.module';
import { KardexModule } from './modules/kardex/kardex.module';
import { IncidenciaModule } from './modules/incidencia/incidencia.module';
import { SedeModule } from './modules/sede/sede.module';
import { AreaModule } from './modules/area/area.module';
import { ProgramaModule } from './modules/programa/programa.module';
import { FichaModule } from './modules/ficha/ficha.module';
import { FichaUsuarioModule } from './modules/ficha_usuario/ficha_usuario.module';
import { UbicacionModule } from './modules/ubicacion/ubicacion.module';
import { TipoUbicacionModule } from './modules/tipo_ubicacion/tipo_ubicacion.module';
import { UnidadModule } from './modules/unidad/unidad.module';
import { LoteModule } from './modules/lote/lote.module';
import { SolicitudModule } from './modules/solicitud/solicitud.module';
import { SolicitudUnidadModule } from './modules/solicitud_unidad/solicitud_unidad.module';
import { SolicitudLoteModule } from './modules/solicitud_lote/solicitud_lote.module';
import { RolModule } from './modules/rol/rol.module';
import { RolPermisosModule } from './modules/rol_permisos/rol_permisos.module';
import { PermisosModule } from './modules/permisos/permisos.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { MaterialModule } from './modules/material/material.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    PrestamoModule,
    ValidacionModule,
    CentroModule,
    EntregaUnidadModule,
    EntregaLoteModule,
    EntregaModule,
    DevolucionModule,
    DevolucionUnidadModule,
    TrasladoModule,
    TrasladoUnidadModule,
    TrasladoLoteModule,
    KardexModule,
    IncidenciaModule,
    SedeModule,
    AreaModule,
    ProgramaModule,
    FichaModule,
    FichaUsuarioModule,
    UbicacionModule,
    TipoUbicacionModule,
    UnidadModule,
    LoteModule,
    SolicitudModule,
    SolicitudUnidadModule,
    SolicitudLoteModule,
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
