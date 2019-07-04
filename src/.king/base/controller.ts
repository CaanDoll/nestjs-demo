export interface IPageData { // findAndCountAll分页结果
  rows: object[];
  count: number;
}

interface IResponse {
  code: number,
  message: string,
  data?: any,
}

interface IPageResponse extends IResponse{
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
        list: data.rows,
        total: data.count,
      },
    };
  }

  protected failed(errorKey: string, data?: object | object[]): IResponse {
    const body: IResponse = {
      code: 200,
      message: 'success',
    };
    if (data) body.data = data;
    return body;
  }
}
