import { BaseModel } from '@common/base/base.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { RoleModel } from '../role/role.model';

@Entity({
  name: 'user'
})
export class UserModel extends BaseModel {
  @Column({
    comment: '名称',
    type: 'varchar',
    length: 50,
  })
  username: string;

  @Column({
    comment: '密码',
    type: 'varchar',
    length: 200,
  })
  password: string;

  @Column({
    comment: '描述',
    type: 'varchar',
    length: 50,
  })
  desc: string;

  @Column({
    comment: '状态，1启用，0禁用',
    type: 'int',
  })
  status: number;

  @ManyToOne(() => RoleModel)
  @JoinColumn({
    name: 'role_uuid',
    referencedColumnName: 'uuid',
  })
  roleUuid: string;
}
