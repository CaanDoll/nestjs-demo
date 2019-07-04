import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { EnvTransformer, LocalDateTransformer } from "./transformer";

export default class {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    comment: "添加时间",
    type: "timestamp",
    transformer: new LocalDateTransformer()
  })
  rowAddTime: Date;

  @UpdateDateColumn({
    comment: "更新时间",
    type: "timestamp",
    transformer: new LocalDateTransformer()
  })
  rowUpdateTime: Date;

  @Column({
    comment: "环境",
    type: "varchar",
    length: 45,
    transformer: new EnvTransformer()
  })
  env: string;
}
