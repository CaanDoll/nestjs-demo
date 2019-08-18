export enum BizFailedCodeEnum {
  USERNAME_OR_PASSWORD_WRONG = 1001,
}

type BizFailedCodeType = {
  [propName in BizFailedCodeEnum]: string;
};

export const bizFailedDesc: BizFailedCodeType = {
  [BizFailedCodeEnum.USERNAME_OR_PASSWORD_WRONG]: '用户名或密码错误',
};
