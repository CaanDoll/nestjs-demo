import { Integration } from '@config/index.interface';
import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ConfigService } from '../config/index.service';
import { BizFailedException } from '../http/biz-failed';
import { Logger } from '../logger/index.service';

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
    Object.keys(integration).forEach(key => {
      this.axiosInstances[key] = axios.create({
        baseURL: integration[key],
      });
      this.axiosInstances[key].interceptors.request.use(config => {
        Logger.log(`${key} request ${JSON.stringify(config)}`, 'HttpService');
        return config;
      }, error => {
        Logger.error(`${key} request ${JSON.stringify(error)}`, 'HttpService');
        return Promise.reject(error);
      });
      this.axiosInstances[key].interceptors.response.use(({ data }) => {
        Logger.log(` ${key} response ${JSON.stringify(data)}`, 'HttpService');
        if (data.code !== 200) throw new BizFailedException(data);
        return data;
      }, error => {
        Logger.error(`${key} response ${JSON.stringify(error)}`, 'HttpService');
        return Promise.reject(error);
      });
    });
  }

  prefix(key: keyof Integration) {
    return this.axiosInstances[key];
  }
}
