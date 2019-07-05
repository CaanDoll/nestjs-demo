import { Module } from '@nestjs/common';
import ConfigService from './index.service';

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(),
    },
  ],
  exports: [ConfigService],
})
export default class ConfigModule{}
