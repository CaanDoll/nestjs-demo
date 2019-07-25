import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/index.module';
import { ConfigService } from '../config/index.service';
import { HttpService } from './index.service';

@Module({
  imports: [
    ConfigModule,
  ],
  providers: [
    {
      provide: HttpService,
      useValue: new HttpService(ConfigService.getInstance()),
    },
  ],
  exports: [ HttpService ],
})
export class HttpModule {}
