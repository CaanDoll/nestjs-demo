import { ConfigModule } from '@common/config/config.module';
import { ConfigService } from '@common/config/config.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { RedisModule, RedisModuleOptions } from 'nestjs-redis';
import { RoleModule } from './module/role/role.module';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: (configService: ConfigService) => configService.get('typeorm') as TypeOrmModuleOptions,
    }),
    RedisModule.forRootAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: (configService: ConfigService) => configService.get('redis') as RedisModuleOptions,
    }),
    UserModule,
    RoleModule,
  ],
})
export class AppModule {}
