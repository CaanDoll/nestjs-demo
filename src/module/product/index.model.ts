import { BaseModel } from 'king/base/model';
import { Column, Entity } from 'typeorm';

@Entity()
export class Product extends BaseModel {
  @Column({
    name: 'order_product_id',
    type: 'varchar',
    length: 45,
    unique: true,
    nullable: false,
  })
  orderProductId: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 50,
    name: 'product_id',
    comment: '产品ID',
  })
  productId: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'appid',
    comment: 'appid',
  })
  appid: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'name',
    comment: '产品名',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'code',
    comment: '产品编码',
  })
  code: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'cat_id',
    comment: '产品分类id',
  })
  catId: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 50,
    name: 'cat_name',
    comment: '产品分类名称',
  })
  catName?: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 50,
    name: 'dept_id',
    comment: '产品归属部门ID',
  })
  deptId?: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 50,
    name: 'income_type',
    comment: '收入计算方式',
  })
  incomeType: string;

  @Column({
    type: 'boolean',
    name: 'is_refund',
    comment: '产品是否可以退款',
  })
  isRefund: boolean;

  @Column({
    type: 'boolean',
    name: 'is_post_pay',
    comment: '产品是否可以后付费',
  })
  isPostPay: boolean;

  @Column({
    type: 'boolean',
    name: 'is_api',
    comment: '产品是否是有api接口对接的工单的产品',
  })
  isApi: boolean;

  @Column({
    type: 'varchar',
    length: 1024,
    name: 'open_type_id',
    comment: '产品开通服务工单分类ID',
  })
  openTypeId: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 1024,
    name: 'close_type_id',
    comment: '产品关闭服务工单分类ID',
  })
  closeTypeId?: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'item_id',
    comment: '产品套餐ID',
  })
  itemId: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'item_code',
    comment: '产品套餐CODE',
  })
  itemCode?: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'item_name',
    comment: '产品套餐名称',
  })
  itemName: string;

  @Column({
    nullable: true,
    type: 'text',
    name: 'key_props',
    comment: '产品关键属性',
  })
  keyProps?: string;

  @Column({
    nullable: true,
    type: 'text',
    name: 'service_content',
    comment: '产品服务内容',
  })
  serviceContent?: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 50,
    name: 'type',
    comment: '报价类型',
  })
  type: string;

  @Column({
    type: 'int',
    name: 'price',
    comment: '产品报价',
  })
  price: number;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'unit',
    comment: '产品单位',
  })
  unit: string;

  @Column({
    type: 'int',
    name: 'unit_count',
    comment: '产品数量',
  })
  unitCount: number;

  @Column({
    comment: '是否需要前置条件',
    type: 'int',
    name: 'is_pre_cond',
  })
  isPreCond: number;

  @Column({
    comment: '是否国外版',
    type: 'int',
    name: 'is_foreign',
    default: 0,
  })
  isForeign: number;

  @Column({
    comment: 'crm 产品ID',
    type: 'varchar',
    length: 1024,
    name: 'crm_prod_id',
  })
  crmProdId: string;
}
