'use strict';

export enum EErrorCode {
  USERNAME_OR_PASSWORD_WRONG = 'USERNAME_OR_PASSWORD_WRONG',
}

type IErrorCodeGroup = {
  [propName in EErrorCode]: {
    code: number;
    message: string;
  };
};

const error: IErrorCodeGroup = {
  [EErrorCode.USERNAME_OR_PASSWORD_WRONG]: {
    code: 1001,
    message: '用户名或密码错误',
  },
};

export default error;
