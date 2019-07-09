export enum ErrorType {
  USERNAME_OR_PASSWORD_WRONG = 'USERNAME_OR_PASSWORD_WRONG',
}

type IErrorCodeGroup = {
  [propName in ErrorType]: string;
};

const error: IErrorCodeGroup = {
  [ErrorType.USERNAME_OR_PASSWORD_WRONG]: '用户名或密码错误',
};

export default error;
