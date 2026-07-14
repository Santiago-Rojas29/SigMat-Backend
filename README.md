# SigMat — Backend

API REST + WebSocket para SIGMAT (Sistema de Gestión de Materiales), construida con NestJS siguiendo una arquitectura hexagonal (dominio / aplicación / infraestructura por módulo).

## Requisitos

- Node.js 18+
- Docker (para levantar Postgres y Redis)

## 1. Variables de entorno

Crea un archivo `.env` en la raíz de `SigMat-Backend/` con estas claves:

```env
# Base de datos
DB_HOST=localhost
DB_PORT=5435
DB_USERNAME=postgres
DB_PASSWORD=tu_password
DB_NAME=Sigmat

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Correo (recuperación de contraseña, notificaciones)
MAIL_HOST=smtp.tu-proveedor.com
MAIL_PORT=587
MAIL_USER=tu_usuario
MAIL_PASSWORD=tu_password

# Autenticación
JWT_SECRET=una_cadena_larga_y_aleatoria

# CORS — orígenes permitidos del frontend, separados por coma
FRONTEND_URL=http://localhost:5173,http://localhost:4200

# Opcional — sobreescriben las credenciales por defecto del usuario Root
ROOT_EMAIL=root@sigmat.com
ROOT_PASSWORD=Sigmat2024*
```

`DB_PORT=5435` porque el contenedor de Postgres mapea `5435:5432` (ver `docker-compose.yml`), para no chocar con un Postgres local corriendo en el puerto por defecto.

## 2. Levantar la infraestructura (Docker)

El backend **no corre dentro de un contenedor**: Docker solo provee Postgres y Redis. La API se ejecuta directo con Node.

```bash
docker-compose up -d
```

Esto levanta:
- `sigmat` — Postgres 14.3 en el puerto `5435`
- `sigmat-redis` — Redis 7 en el puerto `6379`

## 3. Instalar dependencias y correr

```bash
npm install
npm run start:dev
```

La API queda disponible en `http://localhost:3000/api`.

### Qué pasa automáticamente al arrancar

- **`synchronize: true`** en TypeORM: el esquema de la base de datos se crea/sincroniza solo a partir de las entidades. No hace falta correr migraciones a mano en desarrollo (debe desactivarse antes de ir a producción).
- **El usuario Root se crea solo, la primera vez que arranca el backend.** Un `RootSeedService` (`OnModuleInit`) siembra los roles y permisos base y, si todavía no existe un usuario con el correo `root@sigmat.com` (o el que definas en `ROOT_EMAIL`), lo crea con la contraseña `Sigmat2024*` (o `ROOT_PASSWORD`). Es idempotente: en cada reinicio verifica si ya existe y, de ser así, no hace nada — no reinicia la contraseña ni duplica el usuario.

Con eso ya puedes iniciar sesión con el Root y empezar a crear centros, sedes y administradores desde la UI, sin correr ningún script adicional.

### Scripts de seed manuales (opcionales)

Estos NO son necesarios para tener el Root funcionando — son datos de ejemplo/demo aparte:

- `npm run seed` — crea roles, permisos y asignaciones de ejemplo por SQL directo (pensado para poblar un entorno de pruebas, no reemplaza al `RootSeedService`).
- `npm run seed:materiales` — importa el catálogo de materiales desde el clasificador UNSPSC (`.xlsx`). Puede apuntarse a otro archivo con `UNSPSC_FILE=/ruta/al/archivo.xlsx npm run seed:materiales`.

## Arquitectura — lo más importante

- **Hexagonal por módulo**: cada módulo en `src/modules/` separa dominio (entidades e interfaces de repositorio), aplicación (casos de uso/servicios) e infraestructura (controladores REST, repositorios TypeORM).
- **Multitenant por sede**: casi todas las entidades tienen `id_sede`. Un `TenantInterceptor` global lee `req.user.id_sede` del JWT y lo expone vía `TenantService` (basado en `AsyncLocalStorage`) durante toda la petición. Los repositorios filtran automáticamente: `id_sede: tenant.tenantId` para usuarios normales, sin filtro para el rol Root (que ve todas las sedes).
- **Permisos granulares**: cada rol tiene permisos por módulo y acción (`ver`, `crear`, `editar`, `eliminar`, más acciones específicas como `aprobar`/`prestar`/`devolver`). Se validan con guards (`PermissionsGuard` + `@RequirePermission(...)`).
- **WebSocket + notificaciones**: gateway Socket.IO para notificaciones en tiempo real (campana en el frontend), más cron jobs para avisos periódicos (préstamos vencidos, stock crítico, etc.).
- **Reportes**: generación de PDFs con datos filtrados por sede y por rol.

## Tests

```bash
npm run test        # unitarios
npm run test:e2e    # end-to-end
npm run test:cov    # cobertura
```
