import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { EnvTransformer, LocalDateTransformer } from "../util/typeorm-transformer";

export abstract class BaseModel{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: "环境",
    type: "varchar",
    length: 45,
    transformer: new EnvTransformer()
  })
  env: string;

  @CreateDateColumn({
    comment: "创建时间",
    name: 'row_add_time',
    type: "timestamp",
    transformer: new LocalDateTransformer()
  })
  rowAddTime: Date;

  @UpdateDateColumn({
    comment: "更新时间",
    name: 'row_update_time',
    type: "timestamp",
    transformer: new LocalDateTransformer()
  })
  rowUpdateTime: Date;

}
