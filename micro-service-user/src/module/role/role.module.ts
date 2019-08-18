import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntegrationModule } from '../../integration/index.module';
import { RoleController } from './role.controller';
import { RoleModel } from './role.model';
import { RoleService } from './role.service';

@Module({
  imports: [
    IntegrationModule,
    TypeOrmModule.forFeature([ RoleModel ]),
  ],
  controllers: [ RoleController ],
  providers: [ RoleService ],
})
export class RoleModule {}
