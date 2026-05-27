import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioOrmEntity } from '../usuario/infrastructure/entities/usuario.orm-entity';
import { RolPermisosOrmEntity } from '../rol_permisos/infrastructure/entities/rol_permisos.orm-entity';
import { PermisosOrmEntity } from '../permisos/infrastructure/entities/permisos.orm-entity';
import { AuthController } from './infrastructure/adapters/in/auth.controller';
import { AuthTypeOrmRepository } from './infrastructure/adapters/out/auth.typeorm-repository';
import { JwtStrategy } from './infrastructure/adapters/out/jwt.strategy';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { ObtenerMisPermisosUseCase } from './application/use-cases/obtener-mis-permisos.use-case';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioOrmEntity, RolPermisosOrmEntity, PermisosOrmEntity]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET ?? 'clave_secreta_jwt_sigmat_2024',
        signOptions: { expiresIn: '8h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    ObtenerMisPermisosUseCase,
    JwtStrategy,
    JwtAuthGuard,
    { provide: 'AuthRepository', useClass: AuthTypeOrmRepository },
  ],
  exports: [JwtAuthGuard, JwtStrategy],
})
export class AuthModule {}
