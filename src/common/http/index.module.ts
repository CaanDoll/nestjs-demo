import { ConfigModule } from '@common/config/index.module';
import { ConfigService } from '@common/config/index.service';
import { Module } from '@nestjs/common';
import { HttpService } from './index.service';

@Module({
  imports: [
    ConfigModule,
  ],
  providers: [
    {
      provide: HttpService,
      useValue: new HttpService(new ConfigService()),
    },
  ],
  exports: [ HttpService ],
})
export class HttpModule {}
