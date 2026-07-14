import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface JwtPayload {
  sub: string;
  correo: string;
  id_rol: string;
  nombre_rol: string;
  id_sede: string | null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET no está definido en el .env — la app no puede arrancar sin él.');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  validate(payload: JwtPayload) {
    return { id: payload.sub, correo: payload.correo, id_rol: payload.id_rol, nombre_rol: payload.nombre_rol, id_sede: payload.id_sede ?? null };
  }
}
