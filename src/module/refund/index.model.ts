import * as Enum from '@module/order/index.enum';
import { BaseModel } from 'king/base/model';
import { LocalDateTransformer } from 'king/util/typeorm-transformer';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'refund',
})
export class Refund extends BaseModel {
  @Column({
    name: 'order_refund_id',
    type: 'varchar',
    length: 45,
    unique: true,
    nullable: false,
  })
  orderRefundId: string;

  /**
   * 8. 退款相关
   */
  @Column({
    nullable: true,
    comment: '退款金额',
    type: 'int',
    name: 'refund_amount',
  })
  refundAmount?: number;

  @Column({
    comment: '退款状态',
    type: 'enum',
    enum: Enum.RefundState,
    default: Enum.RefundState.APPLIED,
    name: 'refund_state',
  })
  refundState: Enum.RefundState;

  @Column({
    nullable: true,
    comment: '退款理由',
    type: 'varchar',
    length: 200,
    name: 'refund_reason',
  })
  refundReason?: string;

  @Column({
    nullable: true,
    comment: '退款申请人',
    type: 'varchar',
    length: 40,
    name: 'refund_proposer_id',
  })
  refundProposerId?: string;

  @Column({
    nullable: true,
    comment: '退款申请人名称',
    type: 'varchar',
    length: 40,
    name: 'refund_proposer_name',
  })
  refundProposerName?: string;

  @Column({
    nullable: true,
    comment: '退款流水号',
    type: 'varchar',
    length: 100,
    name: 'refund_serial_number',
  })
  refundSerialNumber?: string;

  @Column({
    nullable: true,
    comment: '退款处理意见',
    type: 'varchar',
    length: 100,
    name: 'refund_audit_note',
  })
  refundAuditNote?: string;

  @Column({
    nullable: true,
    comment: '退款退回方式',
    type: 'varchar',
    length: 100,
    name: 'refund_back_way',
  })
  refundBackWay?: string;

  @Column({
    nullable: true,
    comment: '退款结束时间',
    type: 'timestamp',
    name: 'refund_end_at',
    transformer: new LocalDateTransformer(),
  })
  refundEndAt?: Date;

  @Column({
    nullable: true,
    comment: '退款工单号',
    type: 'varchar',
    length: 100,
    name: 'refund_officer_id',
  })
  refundOfficerId?: string;

  @Column({
    nullable: true,
    comment: '处理意见',
    type: 'varchar',
    name: 'remark',
    length: 255,
  })
  remark?: string;
}
