import { HttpModule } from '@common/http/index.module';
import { IntegrationService } from './index.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    HttpModule,
  ],
  providers: [
    IntegrationService,
  ],
  exports: [ IntegrationService ],
})
export class IntegrationModule {}
