import { Product } from "@module/product/index.model";
import { Officer } from "@module/officer/index.model";
import { Pay } from "@module/pay/index.model";
import { Refund } from "@module/refund/index.model";
import { LocalDateTransformer } from "king/util/typeorm-transformer";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { BaseModel } from "king/base/model";
import * as Enum from "./index.enum";

@Entity()
export class Order extends BaseModel {
  @Column({
    comment: "订单号",
    type: "varchar",
    length: 45,
    unique: true,
    name: "order_id"
  })
  orderId: string;

  @Column({
    comment: "全局ID",
    type: "varchar",
    length: 45
  })
  gid: string;

  @Column({
    nullable: true,
    comment: "商户订单号(前置条件信息)",
    type: "varchar",
    name: "merchant_order_id"
  })
  merchantOrderId?: string;

  @Column({
    nullable: true,
    comment: "商户批次号",
    type: "varchar",
    name: "merchant_batch_id"
  })
  merchantBatchId?: string;

  @Column({
    comment: "批次号",
    type: "varchar",
    name: "batch_id"
  })
  batchId: string;

  @Column({
    comment: "订单状态",
    default: Enum.OrderState.CREATE,
    name: "order_state"
  })
  orderState: string;

  /**
   * 2. 人员相关
   */
  @Column({
    comment: "创建人类型",
    type: "enum",
    enum: Enum.OrderCreatorType,
    default: Enum.OrderCreatorType.USER,
    name: "creator_type"
  })
  creatorType?: Enum.OrderCreatorType;

  @Column({
    comment: "创建人ID", // -> 创建人名
    type: "varchar",
    length: "45",
    name: "creator_id"
  })
  creatorId: string;

  @Column({
    comment: "用户ID",
    type: "varchar",
    length: 45,
    name: "user_id"
  })
  userId: string;

  @Column({
    nullable: true,
    comment: "用户名",
    type: "varchar",
    name: "username"
  })
  username: string;

  @Column({
    nullable: true,
    comment: "用户公司ID",
    type: "varchar",
    name: "user_company_id"
  })
  userCompanyId?: string;

  @Column({
    nullable: true,
    comment: "客户经理ID",
    type: "varchar",
    length: 45,
    name: "manager_id"
  })
  managerId?: string;

  @Column({
    nullable: true,
    comment: "客户经理部门ID",
    type: "varchar",
    length: 45,
    name: "manager_department_id"
  })
  managerDepartmentId?: string;

  @Column({
    nullable: true,
    comment: "创建人名",
    type: "varchar",
    length: "45",
    name: "creator_name"
  })
  creatorName?: string;

  @Column({
    nullable: true,
    comment: "用户名称",
    type: "varchar",
    name: "user_name"
  })
  userName?: string;

  @Column({
    nullable: true,
    comment: "用户公司名称",
    type: "varchar",
    name: "user_company_name"
  })
  userCompanyName?: string;

  @Column({
    nullable: true,
    comment: "客户经理名称",
    type: "varchar",
    length: 45,
    name: "manager_name"
  })
  managerName?: string;

  @Column({
    nullable: true,
    comment: "客户经理部门名称", // -> 客户经理名称 客户经理部门ID 客户经理部门名称
    type: "varchar",
    length: 45,
    name: "manager_department_name"
  })
  managerDepartmentName?: string;

  @Column({
    nullable: true,
    comment: "合同号",
    type: "varchar",
    length: 45,
    name: "contract_numero"
  })
  contractNumero?: string;

  /**
   * 5. 支付相关 订单创建后 支付中 和 支付失败 和 支付成功的信息
   * 支付状态
   * 是否后付费
   * 是否开票
   */
  @Column({
    comment: "支付状态",
    type: "enum",
    enum: Enum.OrderPayState,
    default: Enum.OrderPayState.NOT_PAY,
    name: "pay_state"
  })
  payState?: Enum.OrderPayState;

  @Column({
    comment: "优惠金额",
    type: "int",
    default: 0,
    name: "discount_amount"
  })
  discountAmount?: number;

  @Column({
    comment: "应付金额 adjustPrice || (quotationAmount - offerAmount)",
    type: "int",
    default: 0,
    name: "payable_amount"
  })
  payableAmount: number;

  @Column({
    nullable: true,
    comment: "备注",
    type: "varchar",
    length: 200,
    name: "note"
  })
  note?: string;

  @Column({
    comment: "订单来源",
    type: "enum",
    enum: Enum.OrderSource,
    name: "source"
  })
  source: Enum.OrderSource;

  @Column({
    comment: "订单类型",
    type: "enum",
    enum: Enum.OrderType,
    default: Enum.OrderType.NEW,
    name: "order_type"
  })
  orderType?: Enum.OrderType;

  @Column({
    nullable: true,
    comment: "前置条件",
    type: "varchar",
    length: 1024,
    name: "precondition"
  })
  precondition?: string;

  @Column({
    comment: "服务开始时间",
    type: "timestamp",
    name: "service_start_at",
    nullable: true,
    transformer: new LocalDateTransformer()
  })
  serviceStartAt: Date;

  @Column({
    nullable: true,
    comment: "服务到期时间",
    type: "timestamp",
    name: "expired_at",
    transformer: new LocalDateTransformer()
  })
  expiredAt: Date;

  @Column({
    comment: "是否开发票 0 否 1 是",
    type: "int",
    name: "is_invoice",
    default: 0
  })
  isInvoice?: number;

  @Column({
    nullable: true,
    comment: "手动调整后的价格(手动调价专用)",
    type: "int",
    name: "adjust_price"
  })
  adjustPrice?: number;

  @Column({
    nullable: true,
    comment: "手动调整价格原因(手动调价专用)",
    type: "varchar",
    length: 100,
    name: "adjust_price_memo"
  })
  adjustPriceMemo?: string;

  @Column({
    comment: "是否申请退款中",
    type: "boolean",
    default: false,
    name: "if_apply_refund"
  })
  ifApplyRefund?: boolean; // ***

  @Column({
    comment: "续约状态",
    type: "enum",
    enum: Enum.ContractState,
    default: Enum.ContractState.NOT_CONTRACT,
    name: "contract_state"
  })
  contractState?: string;

  @Column({
    comment: "服务到期表原因",
    nullable: true,
    name: "expired_reason"
  })
  expiredReason?: string;

  @Column({
    comment: "服务到期表备注",
    type: "varchar",
    length: 255,
    nullable: true,
    name: "expired_remark"
  })
  expiredRemark?: string;

  @Column({
    comment: "是否后付费",
    type: "boolean",
    default: false,
    name: "if_post_pay"
  })
  ifPostPay?: boolean;

  @Column({
    nullable: true,
    comment: "支付成功后的跳转地址",
    type: "varchar",
    length: 2048,
    name: "paid_redirect_url"
  })
  paidRedirectUrl?: string;

  @Column({
    nullable: true,
    comment: "线上下工单地址",
    type: "varchar",
    length: 2048,
    name: "order_sync_url"
  })
  orderSyncUrl?: string;

  @Column({
    comment: "是否过期 0-未过期 1-已过期",
    default: 0,
    type: "int",
    name: "is_expired"
  })
  isExpired: number;

  @Column({
    nullable: true,
    comment: "升级，续费的创建的新订单号",
    type: "varchar",
    length: 45,
    name: "new_order_id"
  })
  newOrderId: string;

  @OneToOne(() => Product, {
    cascade: ["insert"]
  })
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'orderProductId',
  })
  product: Product;

  @OneToOne(() => Officer, {
    cascade: true
  })
  @JoinColumn({
    name: 'officer_id',
    referencedColumnName: 'orderOfficerId',
  })
  officer: Officer;

  @OneToOne(() => Pay, {
    cascade: true
  })
  @JoinColumn({
    name: 'pay_id',
    referencedColumnName: 'orderPayId',
  })
  pay: Pay;

  @OneToOne(() => Refund, {
    cascade: true
  })
  @JoinColumn({
    name: 'refund_id',
    referencedColumnName: 'orderRefundId',
  })
  refund: Refund;

  @Column({
    nullable: true,
    type: "varchar",
    length: 3096,
    name: "pay_url",
    comment: "预支付返回二维码或者地址"
  })
  payUrl?: string;
}
