import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface JwtPayload {
  sub: string;
  correo: string;
  id_rol: string;
  id_sede: string | null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET ?? 'clave_secreta_jwt_sigmat_2024',
    });
  }

  validate(payload: JwtPayload) {
    return { id: payload.sub, correo: payload.correo, id_rol: payload.id_rol, id_sede: payload.id_sede ?? null };
  }
}
