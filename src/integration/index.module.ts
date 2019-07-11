import { HttpModule } from '@common/http/index.module';
import { IntegrationService } from '@integration/index.service';
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
