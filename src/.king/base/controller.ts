import * as path from 'path';
const errorModule = require(path.join(process.cwd(), 'src/error'));
const error = errorModule.default;

const { npm_package_code } = process.env;

export type IPageData = [any[], number];

export interface IResponse {
  code: number | string;
  message: string;
  data?: any;
}

export interface IPageResponse extends IResponse {
  data: {
    list: any[],
    total: number,
  };
}

export abstract class BaseController {
  protected success(data?: object | object[] | null): IResponse {
    const body: IResponse = {
      code: 200,
      message: 'success',
    };
    if (data) body.data = data;
    return body;
  }

  protected successPageData(data: IPageData): IPageResponse {
    return {
      code: 200,
      message: 'success',
      data: {
        list: data[0],
        total: data[1],
      },
    };
  }

  protected failed(errorType: string, data?: object | object[]): IResponse {
    const body: IResponse = {
      code: `${npm_package_code}${errorType}`,
      message: error[errorType],
    };
    if (data) body.data = data;
    return body;
  }

}
