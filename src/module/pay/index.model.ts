import { BaseModel } from '@common/base/model';
import { LocalDateTransformer } from '@common/util/typeorm-transformer';
import * as Enum from '@module/order/index.enum';
import { Column, Entity } from 'typeorm';

@Entity()
export class Pay extends BaseModel {
  @Column({
    name: 'order_pay_id',
    type: 'varchar',
    length: 45,
    nullable: false,
    unique: true,
  })
  orderPayId: string;

  @Column({
    nullable: true,
    comment: '实际支付金额',
    type: 'int',
    name: 'actual_amount',
  })
  actualAmount: number;

  @Column({
    comment: '报价类型',
    type: 'enum',
    enum: Enum.OrderQuotationType,
    default: Enum.OrderQuotationType.NORMAL,
    name: 'quotation_type',
  })
  quotationType?: Enum.OrderQuotationType;

  @Column({
    nullable: true,
    comment: '支付方式',
    name: 'pay_type',
  })
  payType: string;

  @Column({
    nullable: true,
    comment: '支付时间',
    type: 'timestamp',
    name: 'pay_at',
    transformer: new LocalDateTransformer(),
  })
  payAt: Date;

  @Column({
    nullable: true,
    comment: '支付流水号',
    type: 'varchar',
    length: 100,
    name: 'pay_serial_number',
  })
  paySerialNumber?: string;

  @Column({
    nullable: true,
    comment: '支付失败信息(线上汇款专用)',
    type: 'varchar',
    length: 100,
    name: 'pay_fail_message',
  })
  payFailMessage: string;

  @Column({
    nullable: true,
    comment: '支付备注(线上汇款专用)',
    type: 'varchar',
    length: 100,
    name: 'pay_note',
  })
  payNote?: string;

  @Column({
    nullable: true,
    comment: '收款操作人ID(线下汇款专用)',
    type: 'varchar',
    length: 100,
    name: 'receipt_operator_id',
  })
  receiptOperatorId?: string;

  @Column({
    nullable: true,
    comment: '收款操作人名字(线下汇款专用)',
    type: 'varchar',
    length: 100,
    name: 'receipt_operator_name',
  })
  receiptOperatorName?: string;

  @Column({
    nullable: true,
    comment: '收款操作时间(线下汇款专用)',
    type: 'timestamp',
    name: 'receipt_operation_at',
    transformer: new LocalDateTransformer(),
  })
  receiptOperationAt?: Date;

  @Column({
    nullable: true,
    comment: '收款信息(线下汇款专用)',
    type: 'varchar',
    length: 100,
    name: 'receipt_info',
  })
  receiptInfo?: string;

  @Column({
    nullable: true,
    comment: '收款凭证(线下汇款专用)',
    type: 'text',
    name: 'receipt_voucher',
  })
  receiptVoucher?: string;

  @Column({
    nullable: true,
    comment: '收款备注(线下汇款专用)',
    type: 'varchar',
    length: 100,
    name: 'receipt_note',
  })
  receiptNote?: string;

  @Column({
    nullable: true,
    comment: '初选汇款账号(线下汇款专用)',
    type: 'varchar',
    length: 100,
    name: 'primary_remittance_account',
  })
  primaryRemittanceAccount?: string;

  @Column({
    nullable: true,
    comment: '初选汇款公司名(线下汇款专用)',
    type: 'varchar',
    length: 100,
    name: 'primary_remittance_company',
  })
  primaryRemittanceCompany?: string;

  @Column({
    nullable: true,
    comment: '初选汇款开户行(线下汇款专用)',
    type: 'varchar',
    length: 100,
    name: 'primary_remittance_bank',
  })
  primaryRemittanceBank?: string;
}
