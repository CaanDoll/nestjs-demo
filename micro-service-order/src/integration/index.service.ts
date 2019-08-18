import { HttpService } from '../../../common/http/index.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IntegrationService {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  async getProductLine(appid: string) {
    return this.httpService.prefix('product')
      .get(`/api/v1/ms/product-lines/${appid}`);
  }

  async postProductPriceByCode(body) {
    return this.httpService.prefix('product')
      .post('/api/v1/ms/prices/batch-price-by-code', body);
  }

  async postOpenapiCallback(body) {
    return this.httpService.prefix('openapi')
      .post('/api/v1/callback', body);
  }
}
