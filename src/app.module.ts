import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrestamoModule } from './modules/prestamo/prestamo.module';
import { ValidacionModule } from './modules/validacion/validacion.module';
import { EntregaUnidadModule } from './modules/entrega_unidad/entrega_unidad.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
