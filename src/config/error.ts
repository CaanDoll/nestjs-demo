export enum ErrorType {
  USERNAME_OR_PASSWORD_WRONG = 'USERNAME_OR_PASSWORD_WRONG',
}

type IErrorCodeGroup = {
  [propName in ErrorType]: {
    code: number;
    message: string;
  };
};

const error: IErrorCodeGroup = {
  [ErrorType.USERNAME_OR_PASSWORD_WRONG]: {
    code: 1001,
    message: '用户名或密码错误',
  },
};

export default error;
