import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserModel } from './user.model';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ UserModel ]),
  ],
  controllers: [ UserController ],
  providers: [ UserService ],
})
export class OrderModule {}
