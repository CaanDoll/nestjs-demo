import * as Enum from '@module/order/index.enum';
import { BaseModel } from '@common/base/model';
import { BizIdTransformer, LocalDateTransformer } from '@common/util/typeorm-transformer';
import { Column, Entity } from 'typeorm';

@Entity()
export class Officer extends BaseModel {
  @Column({
    name: 'order_officer_id',
    type: 'varchar',
    length: 45,
    unique: true,
    nullable: false,
    transformer: new BizIdTransformer(),
  })
  orderOfficerId: string;

  @Column({
    comment: '产品分配状态',
    type: 'enum',
    enum: Enum.AllotState,
    default: Enum.AllotState.ALLOTTING,
    name: 'allot_state',
  })
  allotState?: Enum.AllotState;

  @Column({
    comment: '产品分配方式 默认工单分配',
    type: 'enum',
    name: 'allot_way',
    enum: Enum.AllotWay,
    default: Enum.AllotWay.OFFICER,
  })
  allotWay?: Enum.AllotWay;

  @Column({
    nullable: true,
    comment: '产品分配结束时间',
    type: 'timestamp',
    name: 'allot_end_at',
    transformer: new LocalDateTransformer(),
  })
  allotEndAt?: Date;

  @Column({
    nullable: true,
    comment: '工单号',
    type: 'varchar',
    length: 45,
    name: 'allot_officer_id',
  })
  allotOfficerId?: string;
}
