export enum BizFailedCodeEnum {
  USER_NOT_EXISTS_OR_DISABLE = 1001,
}

type BizFailedCodeType = {
  [propName in BizFailedCodeEnum]: string;
};

export const bizFailedDesc: BizFailedCodeType = {
  [BizFailedCodeEnum.USER_NOT_EXISTS_OR_DISABLE]: '用户不存在或被禁用',
};
