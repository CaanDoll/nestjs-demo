import { IColumn, json2excel } from '@common/util/json2excel';
import { error, ErrorType } from '@error/index';
import { Header } from '@nestjs/common';

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

  @Header('Content-Type', 'text/csv')
  protected successXlsx(columns: IColumn[], list: any[], title): string {
    // res.headers.set('Content-disposition', `filename=${title}_${moment().format('YYYYMMDDhhmmss')}.csv`);
    return json2excel(columns, list);
  }

  protected failed(errorType: ErrorType, data?: object | object[]): IResponse {
    const body: IResponse = {
      code: `${npm_package_code}${errorType}`,
      message: error[errorType],
    };
    if (data) body.data = data;
    return body;
  }

}