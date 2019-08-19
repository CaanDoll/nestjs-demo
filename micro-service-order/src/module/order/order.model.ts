import { BaseModel } from '@common/base/base.model';
import {
  Column,
  Entity,
} from 'typeorm';

@Entity({
  name: 'order'
})
export class OrderModel extends BaseModel {
  @Column({
    comment: '订单号',
    name: 'order_no',
    type: 'varchar',
    length: 50,
  })
  orderNo: string;

  @Column({
    comment: '描述',
    type: 'varchar',
    length: 50,
  })
  desc: string;

  @Column({
    comment: '用户uuid',
    name: 'user_uuid',
    type: 'char',
    length: 36,
  })
  userUuid: string;
}
