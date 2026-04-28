#!/bin/bash

# Validar nombre del módulo
if [ -z "$1" ]; then
  echo "❌ Error: Debes pasar el nombre del módulo."
  echo "👉 Uso: ./generate-hex.sh nombre-modulo"
  exit 1
fi

MODULE_NAME=$1
CLASS_NAME="$(tr '[:lower:]' '[:upper:]' <<< ${MODULE_NAME:0:1})${MODULE_NAME:1}"
BASE_DIR="src/modules/$MODULE_NAME"

echo "⚙️ Generando módulo: $MODULE_NAME..."

# Crear carpetas
mkdir -p $BASE_DIR/domain/{entities,ports}
mkdir -p $BASE_DIR/application/use-cases
mkdir -p $BASE_DIR/infrastructure/adapters/{in,out}
mkdir -p $BASE_DIR/infrastructure/entities

# =========================
# DOMAIN - ENTITY
# =========================
cat <<EOF > $BASE_DIR/domain/entities/$MODULE_NAME.entity.ts
export class $CLASS_NAME {
  constructor(
    public readonly id: string,
    public name: string,
  ) {}
}
EOF

# =========================
# DOMAIN - REPOSITORY
# =========================
cat <<EOF > $BASE_DIR/domain/ports/$MODULE_NAME.repository.ts
import { $CLASS_NAME } from '../entities/$MODULE_NAME.entity';

export interface ${CLASS_NAME}Repository {
  create(entity: $CLASS_NAME): Promise<$CLASS_NAME>;
  findAll(): Promise<$CLASS_NAME[]>;
}
EOF

# =========================
# APPLICATION - USE CASE
# =========================
cat <<EOF > $BASE_DIR/application/use-cases/create-$MODULE_NAME.use-case.ts
import { ${CLASS_NAME}Repository } from '../../domain/ports/$MODULE_NAME.repository';
import { $CLASS_NAME } from '../../domain/entities/$MODULE_NAME.entity';

export class Create${CLASS_NAME}UseCase {
  constructor(private readonly repo: ${CLASS_NAME}Repository) {}

  async execute(data: { id: string; name: string }): Promise<$CLASS_NAME> {
    const entity = new $CLASS_NAME(data.id, data.name);
    return this.repo.create(entity);
  }
}
EOF

# =========================
# INFRASTRUCTURE - ORM ENTITY
# =========================
cat <<EOF > $BASE_DIR/infrastructure/entities/$MODULE_NAME.orm-entity.ts
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('$MODULE_NAME')
export class ${CLASS_NAME}OrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;
}
EOF

# =========================
# INFRASTRUCTURE - CONTROLLER
# =========================
cat <<EOF > $BASE_DIR/infrastructure/adapters/in/$MODULE_NAME.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { Create${CLASS_NAME}UseCase } from '../../../application/use-cases/create-$MODULE_NAME.use-case';

@Controller('$MODULE_NAME')
export class ${CLASS_NAME}Controller {
  constructor(private readonly createUseCase: Create${CLASS_NAME}UseCase) {}

  @Post()
  create(@Body() body: { id: string; name: string }) {
    return this.createUseCase.execute(body);
  }
}
EOF

# =========================
# INFRASTRUCTURE - REPOSITORY
# =========================
cat <<EOF > $BASE_DIR/infrastructure/adapters/out/$MODULE_NAME.typeorm-repository.ts
import { Repository } from 'typeorm';
import { ${CLASS_NAME}Repository } from '../../../domain/ports/$MODULE_NAME.repository';
import { ${CLASS_NAME} } from '../../../domain/entities/$MODULE_NAME.entity';
import { ${CLASS_NAME}OrmEntity } from '../../entities/$MODULE_NAME.orm-entity';

export class ${CLASS_NAME}TypeOrmRepository implements ${CLASS_NAME}Repository {
  constructor(private readonly repo: Repository<${CLASS_NAME}OrmEntity>) {}

  async create(entity: ${CLASS_NAME}): Promise<${CLASS_NAME}> {
    const orm = this.repo.create(entity);
    await this.repo.save(orm);
    return entity;
  }

  async findAll(): Promise<${CLASS_NAME}[]> {
    const data = await this.repo.find();
    return data;
  }
}
EOF

# =========================
# MODULE
# =========================
cat <<EOF > $BASE_DIR/$MODULE_NAME.module.ts
import { Module } from '@nestjs/common';

@Module({
  controllers: [],
  providers: [],
})
export class ${CLASS_NAME}Module {}
EOF

echo "✅ Módulo $MODULE_NAME creado con plantillas completas 🚀"