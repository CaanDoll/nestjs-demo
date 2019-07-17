import { BasePageDto } from '@common/base/dto';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import {
  ArrayContains,
  ArrayMaxSize, ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum, IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

/**
 * 订单创建人类型
 * @enum USER USER 用户
 * @enum ADMIN ADMIN 运营人员
 * @enum API API API接口
 */
export enum OrderCreatorType {
  USER = 'USER',
  ADMIN = 'ADMIN',
  API = 'API',
}

/**
 * 订单状态
 * @enum CREATE CREATE 0.已创建
 * @enum CONFIRMED CONFIRMED 1.已确认* 所有逻辑等同已创建
 * @enum POST_PAID POST_PAID 1.后付费 * 后付费等待订单支付
 * @enum LAUNCHED_PAY LAUNCHED_PAY 2. 已发起过支付（支付中） 不可修改价格
 * @enum PAID PAID 3.已支付 支付成功后 可开票 可发起退款
 * @enum DUMPED DUMPED 3.已作废 支付成功前可以作废
 * @enum ALLOCATED ALLOCATED 4.已分配 服务到期后交易关闭
 * @enum LAUNCHED_REFUND LAUNCHED_REFUND 5. 已启动退款 订单发起退款后启动退款流程 退款成功以后交易关闭
 * @enum CLOSED CLOSED 5.退款成功
 * Q: 不存在支付过期
 */
export enum OrderState {
  CREATE = 'CREATE',
  WAIT_PAY = 'WAIT_PAY',
  POST_PAID = 'POST_PAID',
  PAID = 'PAID',
  DUMPED = 'DUMPED',
  COMPLETE = 'COMPLETE',
  CLOSED = 'CLOSED',
}
/**
 * 订单状态
 * @enum CREATE CREATE 0.已创建
 * @enum LAUNCHED_PAY LAUNCHED_PAY 2. 已发起过支付（支付中） 不可修改价格
 * @enum PAID PAID 3.已支付 支付成功后 可开票 可发起退款
 * @enum DUMPED DUMPED 3.已作废 支付成功前可以作废
 * @enum ALLOCATED ALLOCATED 4.已分配(已完成) 服务到期后交易关闭
 * @enum LAUNCHED_REFUND LAUNCHED_REFUND 4.5. 已启动退款 订单发起退款后启动退款流程 退款成功以后交易关闭
 * @enum CLOSED CLOSED 6.退款成功
 */
export enum OrderState2 {
  CREATE = 'CREATE',
  LAUNCHED_PAY = 'LAUNCHED_PAY',
  PAID = 'PAID',
  DUMPED = 'DUMPED',
  COMPLETE = 'COMPLETE',
  CLOSED = 'CLOSED',
}

/**
 * 订单类型
 * @enum NEW NEW 新购
 * @enum UPGRADE UPGRADE 升级
 * @enum RENEWAL RENEWAL 续期
 */
export enum OrderType {
  NEW = 'NEW',
  UPGRADE = 'UPGRADE',
  RENEWAL = 'RENEWAL',
}

/**
 * 工单分配状态
 * @enum WAIT_ALLOT WAIT_ALLOT 待分配
 * @enum ALLOTTING ALLOTTING 分配中
 * @enum ALLOT_FAIL ALLOT_FAIL 分配中
 * @enum COMPLETE COMPLETE 已分配
 */
export enum AllotState {
  WAIT_ALLOT = 'WAIT_ALLOT',
  ALLOTTING = 'ALLOTTING',
  ALLOT_FAIL = 'ALLOT_FAIL',
  COMPLETE = 'COMPLETE',
}

/**
 * 资源分配方式
 * @enum OFFICER OFFICER 工单分配
 */
export enum AllotWay {
  OFFICER = 'OFFICER',
}

/**
 * 订单支付方式
 * @enum OFFLINE OFFLINE 线下付款
 * @enum WECHAT WECHAT 微信
 * @enum ALIPAY ALIPAY 支付宝
 * @enum BALANCE BALANCE 余额支付
 */
export enum OrderPayType {
  OFFLINE = 'OFFLINE',
  WECHAT = 'WECHAT',
  ALIPAY = 'ALIPAY',
  BALANCE = 'BALANCE',
}

/**
 * 订单支付状态
 * @enum NOT_PAY NOT_PAY 未支付
 * @enum PAY_FAIL PAY_FAIL 支付失败
 * @enum PAID PAID 已支付
 */
export enum OrderPayState {
  NOT_PAY = 'NOT_PAY',
  PAY_FAIL = 'PAY_FAIL',
  PAID = 'PAID',
}

/**
 * 订单报价类型
 * @enum NORMAL NORMAL 普通价
 * @enum ONLINE ONLINE 网销价
 * @enum OFFLINE OFFLINE 线下价
 * @enum DISCOUNT DISCOUNT 活动价
 * @enum AGENT AGENT 代理商价
 */
export enum OrderQuotationType {
  NORMAL = 'NORMAL',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  DISCOUNT = 'DISCOUNT',
  AGENT = 'AGENT',
}

/**
 * 订单来源
 * @enum PC PC
 * @enum H5 H5
 * @enum ADMIN ADMIN
 */
export enum OrderSource {
  PC = 'PC',
  H5 = 'H5',
  ADMIN = 'ADMIN',
}

/**
 * @enum APPLIED APPLIED 已申请
 * @enum RESOLVED RESOLVED 已通过
 * @enum REJECTED REJECTED 已驳回
 * @enum REFUND REFUND 已退款
 */
export enum RefundState {
  APPLIED = 'APPLIED',
  RESOLVED = 'RESOLVED',
  REJECTED = 'REJECTED',
  REFUND = 'REFUND',
}

/**
 * @enum RESOLVED RESOLVED 已通过
 * @enum REJECTED REJECTED 已驳回
 */
export enum RefundResult {
  RESOLVED = 'RESOLVED',
  REJECTED = 'REJECTED',
}

/**
 * CONTRACT CONTRACT 已续约
 * NOT_CONTRACT NOT_CONTRACT 未续约
 */
export enum ContractState {
  CONTRACT = 'CONTRACT',
  NOT_CONTRACT = 'NOT_CONTRACT',
}

export enum IfInvoice {
  YES = 0,
  NO = 1,
}

/**
 * 订单消息数据类型
 * @enum ORDER_PAID ORDER_PAID 订单支付成功
 * @enum POST_PAY_ORDER_OKAY POST_PAY_ORDER_OKAY 后付费下单成功
 * @enum REFUND_OKAY REFUND_OKAY 订单退款成功
 * @enum ORDER_COMPLETE ORDER_COMPLETE 订单服务开通完成
 * @enum WILL_EXPIRED_NOTIFY_USER WILL_EXPIRED_NOTIFY_USER 订单即将过期
 * @enum WILL_EXPIRED_NOTIFY_MANAGER WILL_EXPIRED_NOTIFY_MANAGER 订单即将过期
 */
export enum OrderMailDataType {
  ORDER_PAID = 'ORDER_PAID',
  POST_PAY_ORDER_OKAY = 'ORDER_POST_PAY_OKAY',
  REFUND_OKAY = 'REFUND_OKAY',
  ORDER_COMPLETE = 'ORDER_COMPLETE',
  EXPIRED_TO_USER = 'EXPIRED_TO_USER',
  EXPIRED_TO_MANAGER = 'EXPIRED_TO_MANAGER',
}

export class OpIndexDto extends BasePageDto {
  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  orderState?: string;

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  refundState?: string;

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  expiredAtStart?: string;

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  expiredAtEnd?: string;

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  payableAmountStart?: string;

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  payableAmountEnd?: string;

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  managerId?: string;

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  payableAmount?: string;

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  rowAddTimeStart?: string;

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  rowAddTimeEnd?: string;

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  managerDepartmentId?: string;
}

export class OpIndexByOrderIdsDto {
  @IsNotEmpty()
  @ApiModelProperty()
  @IsString()
  orderIds: string;
}

export class OpShowDto {
  @IsNotEmpty()
  @ApiModelProperty()
  @IsString()
  orderId: string;
}

class OpCreateOrderItemDto {
  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  @Length(1, 40)
  precondition?: string;

  @IsNotEmpty()
  @ApiModelProperty()
  @IsString()
  @Length(1, 40)
  itemId: string;

  @IsNotEmpty()
  @ApiModelProperty()
  @IsNumber()
  @Min(1)
  unitCount: number;

  @IsNotEmpty()
  @ApiModelProperty()
  @IsString()
  unit: string;

  @IsNotEmpty()
  @ApiModelProperty()
  @IsEnum(OrderQuotationType)
  priceType: OrderQuotationType;

  @IsOptional()
  @ApiModelPropertyOptional()
  @Min(0)
  @IsInt()
  @IsNumber()
  adjustPrice?: number;

}

export class OpCreateDto {
  @IsNotEmpty()
  @ApiModelProperty()
  @IsString()
  @Length(1, 40)
  userId: string;

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  @Length(1, 40)
  precondition?: string;

  @IsNotEmpty()
  @ApiModelProperty()
  @IsEnum(OrderSource)
  source: OrderSource;

  @IsNotEmpty()
  @ApiModelProperty({ type: [ OpCreateOrderItemDto ] })
  @IsArray()
  @ArrayMaxSize(6)
  @ArrayContains([ OpCreateOrderItemDto ])
  orders: OpCreateOrderItemDto[];

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsBoolean()
  isPostPay: boolean;
}

export class OpCheckPreconditionDto {
  @IsNotEmpty()
  @ApiModelProperty()
  @IsString()
  appid: string;

  @IsNotEmpty()
  @ApiModelProperty()
  @IsString()
  content: string;
}

export class UcAddOrdersPayItemDto {
  @IsOptional()
  @ApiModelPropertyOptional()
  @Length(1, 40)
  @IsString()
  orderId: string;

  @IsArray()
  @ApiModelProperty()
  couponIds: string[];

  @IsOptional()
  @ApiModelPropertyOptional()
  @Length(1, 40)
  @IsString()
  couponCode?: string;
}

export class UcPayDto {
  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  returnUrl?: string;

  @IsOptional()
  @ApiModelPropertyOptional()
  @Length(1, 40)
  @IsString()
  batchId?: string;

  @IsNotEmpty()
  @ApiModelProperty({ type: [ UcAddOrdersPayItemDto ] })
  @ArrayMinSize(1)
  @IsArray()
  orders: UcAddOrdersPayItemDto[];

  @IsNotEmpty()
  @ApiModelProperty()
  @IsString()
  payType: string;
}

export class UcIndexDto extends BasePageDto {
  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  fuzzy?: string;

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  orderType?: string;

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  rowAddTimeStart?: string;

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  rowAddTimeEnd?: string;

  getRowAddTimeStart() {
    return this.rowAddTimeStart ? new Date(this.rowAddTimeStart) : undefined;
  }

  getRowAddTimeEnd() {
    return this.rowAddTimeEnd ? new Date(this.rowAddTimeEnd) : undefined;
  }
}

export class UcShowDto {
  @IsNotEmpty()
  @ApiModelProperty()
  @IsString()
  orderId: string;
}

export class UcCountByOrderStateDto {

}

export class UcInvoiceTotalAmountDto {

}

export class UcPaidProductCountsDto {

}

export class UcUpdateStateDto {

}
