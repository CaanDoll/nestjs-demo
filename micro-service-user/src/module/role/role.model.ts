import { BaseModel } from '@common/base/base.model';
import {
  Column,
  Entity,
} from 'typeorm';

@Entity()
export class RoleModel extends BaseModel {
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
