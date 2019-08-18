export type IPageData<T> = [T[], number];

export interface IResponse<T> {
  code: number;
  message: string;
  data?: T;
}

export interface IPageResponse<T> {
  code: number;
  message: string;
  data: {
    list: T[],
    total: number,
  };
}

export abstract class BaseController {
  protected success(data?: any): IResponse<any> {
    const body: IResponse<any> = {
      code: 200,
      message: 'success',
    };
    if (data) body.data = data;
    return body;
  }

  protected successPageData(data: IPageData<any>): IPageResponse<any> {
    return {
      code: 200,
      message: 'success',
      data: {
        list: data[0],
        total: data[1],
      },
    };
  }

}
