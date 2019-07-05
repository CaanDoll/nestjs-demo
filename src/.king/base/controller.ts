export type IPageData = [any[],number];

export interface IResponse {
  code: number,
  message: string,
  data?: any,
}

export interface IPageResponse extends IResponse{
  data: {
    list: object[],
    total: number,
  }
}

export default abstract class {
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

  protected failed(code, message, data?: object | object[]): IResponse {
    const body: IResponse = {
      code,
      message,
    };
    if (data) body.data = data;
    return body;
  }

}
