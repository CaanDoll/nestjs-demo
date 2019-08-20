import {
  Column,
  CreateDateColumn,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ValueTransformer,
} from 'typeorm';
import * as uuid from 'uuid/v4';

class UuidTransformer implements ValueTransformer {
  public from(value: string): string {
    return value;
  }

  public to(value: string): string {
    return value || uuid();
  }
}

export abstract class BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'char',
    length: 36,
    transformer: new UuidTransformer(),
  })
  @Index({
    unique: true,
  })
  uuid: string;

  @CreateDateColumn({
    comment: '创建时间',
    name: 'create_time',
  })
  createTime: number;

  @UpdateDateColumn({
    comment: '更新时间',
    name: 'update_time',
  })
  updateTime: number;

}
