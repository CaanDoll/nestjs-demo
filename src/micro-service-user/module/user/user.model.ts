import { BaseModel } from '@common/base/base.model';
import { LocalDateTransformer } from '@common/util/typeorm-transformer';
import { Officer } from './user.model';
import { Pay } from '../pay/index.model';
import { Product } from '../product/index.model';
import { Refund } from '../refund/index.model';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import * as Enum from './user.enum';

@Entity()
export class Order extends BaseModel {
  @Column({
    comment: '名称',
    type: 'varchar',
    length: 50,
  })
  name: string;
  @Column({
    comment: '名称',
    type: 'varchar',
    length: 50,
  })
  name: string;

  @Column({
    comment: '描述',
    type: 'varchar',
    length: 50,
  })
  desc: string;
}
