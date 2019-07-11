import { ConfigService } from '@common/config/index.service';
import { Integration } from '@config/index.interface';
import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

interface IAxiosInstances {
  [propsName: string]: AxiosInstance;
}

@Injectable()
export class HttpService {
  private readonly axiosInstances: IAxiosInstances;
  constructor(
    private readonly configService: ConfigService,
  ) {
    const integration: Integration = this.configService.get('integration');
    this.axiosInstances = {};
    for (const key in integration) {
      this.axiosInstances[key] = axios.create({
        baseURL: integration[key],
      });
      this.axiosInstances[key].interceptors.request.use(config => {
        Logger.log(`HttpService ${key} request ${JSON.stringify(config)}`);
        return config;
      }, error => {
        Logger.error(`HttpService ${key} request ${JSON.stringify(error)}`);
        return Promise.reject(error);
      });
      this.axiosInstances[key].interceptors.response.use(({ data }) => {
        Logger.log(`HttpService ${key} response ${JSON.stringify(data)}`);
        return data;
      }, error => {
        Logger.error(`HttpService ${key} response ${JSON.stringify(error)}`);
        return Promise.reject(error);
      });
    }
  }

  prefix(key: keyof Integration) {
    return this.axiosInstances[key];
  }
}
