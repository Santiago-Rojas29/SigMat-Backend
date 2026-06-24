import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolOrmEntity } from 'src/modules/rol/infrastructure/entities/rol.orm-entity';
import { PermisosOrmEntity } from 'src/modules/permisos/infrastructure/entities/permisos.orm-entity';
import { RolPermisosOrmEntity } from 'src/modules/rol_permisos/infrastructure/entities/rol_permisos.orm-entity';

const ROLES = [
  { nombre: 'Root',                  descripcion: 'Super administrador — gestiona centros, sedes y asigna admins' },
  { nombre: 'Administrador',         descripcion: 'Administrador de sede — acceso total dentro de su sede' },
  { nombre: 'Instructor',            descripcion: 'Instructor de formación — solicitudes y préstamos' },
  { nombre: 'Responsable de Bodega', descripcion: 'Gestión de inventario, entregas, traslados e incidencias' },
  { nombre: 'Aprendiz',              descripcion: 'Aprendiz — solicitudes y préstamos' },
];

const PERMISOS = [
  { nombre: 'Estructura',     descripcion: 'Gestión de centros, sedes, áreas, programas y fichas', modulo: 'estructura' },
  { nombre: 'Administración', descripcion: 'Gestión de usuarios, roles y permisos',                modulo: 'administracion' },
  { nombre: 'Inventario',     descripcion: 'Gestión de materiales, lotes, unidades y ubicaciones',  modulo: 'inventario' },
  { nombre: 'Movimientos',    descripcion: 'Solicitudes y préstamos de materiales',                 modulo: 'movimientos' },
  { nombre: 'Control',        descripcion: 'Traslados, incidencias y kardex',                       modulo: 'control' },
];

const ROL_PERMISOS: Record<string, string[]> = {
  'Administrador':         ['estructura', 'administracion', 'inventario', 'movimientos', 'control'],
  'Instructor':            ['movimientos'],
  'Responsable de Bodega': ['inventario', 'movimientos', 'control'],
  'Aprendiz':              ['movimientos'],
};

@Injectable()
export class RootSeedService implements OnModuleInit {
  private readonly logger = new Logger('Seed');

  constructor(
    @InjectRepository(RolOrmEntity)
    private readonly rolRepo: Repository<RolOrmEntity>,
    @InjectRepository(PermisosOrmEntity)
    private readonly permisoRepo: Repository<PermisosOrmEntity>,
    @InjectRepository(RolPermisosOrmEntity)
    private readonly rolPermisoRepo: Repository<RolPermisosOrmEntity>,
  ) {}

  async onModuleInit() {
    const rolesMap: Record<string, RolOrmEntity> = {};
    for (const r of ROLES) {
      let rol = await this.rolRepo.findOneBy({ nombre: r.nombre });
      if (!rol) {
        rol = await this.rolRepo.save(this.rolRepo.create(r));
        this.logger.log(`Rol "${r.nombre}" creado`);
      }
      rolesMap[r.nombre] = rol;
    }

    const permisosMap: Record<string, PermisosOrmEntity> = {};
    for (const p of PERMISOS) {
      let permiso = await this.permisoRepo.findOneBy({ modulo: p.modulo as any });
      if (!permiso) {
        permiso = await this.permisoRepo.save(this.permisoRepo.create(p as any) as any);
        this.logger.log(`Permiso "${p.nombre}" creado`);
      }
      permisosMap[p.modulo] = permiso!;
    }

    for (const [rolNombre, modulos] of Object.entries(ROL_PERMISOS)) {
      const rol = rolesMap[rolNombre];
      if (!rol) continue;
      for (const modulo of modulos) {
        const permiso = permisosMap[modulo];
        if (!permiso) continue;
        const existe = await this.rolPermisoRepo.findOneBy({ id_rol: rol.id, id_permiso: permiso.id });
        if (!existe) {
          await this.rolPermisoRepo.save(this.rolPermisoRepo.create({
            id_rol: rol.id,
            id_permiso: permiso.id,
            submodulos: [],
            acciones: [],
          }));
          this.logger.log(`  ${rolNombre} → ${permiso.nombre}`);
        }
      }
    }

    this.logger.log('Seed completado');
  }
}
