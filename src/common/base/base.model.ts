import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    comment: '创建时间',
    name: 'create_time',
    type: 'int',
  })
  createTime: number;

  @UpdateDateColumn({
    comment: '更新时间',
    name: 'update_time',
    type: 'int',
  })
  updateTime: number;

}
