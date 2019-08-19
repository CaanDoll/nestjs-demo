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
    comment: '总金额',
    name: 'total_mount',
    type: 'int',
    length: 11,
  })
  totalMount: number;

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
