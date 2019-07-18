# 订单系统

> 订单系统负责提供昆仑平台核心订单业务支撑。

核心框架技术储备：[Nest.js 入门文档](https://docs.nestjs.cn/6/firststeps)

## 目录结构

```bash
.
├── README.md
├── nest-cli.json # 脚手架配置
├── package-lock.json
├── package.json
├── src
│   ├── app.module.ts # 入口 module
│   ├── common # 公用模块（submodule）
│   │   ├── base # 基类
│   │   │   ├── controller.ts # Controller 基类
│   │   │   ├── dto.ts # DAO 基类
│   │   │   └── model.ts # Model 基类
│   │   ├── config # 配置 module
│   │   ├── http # 请求 module（对外发送请求）
│   │   ├── logger # 日志 module
│   │   ├── middleware # 中间件
│   │   └── util # 公用方法
│   │       ├── gen-biz-id.ts # 生成 Gid
│   │       ├── json2excel.ts # json 转 excel
│   │       ├── typeorm-transformer.ts # typeorm 转换方法
│   │       └── validation-pipe.ts # 验证管道
│   ├── config # 配置 module 读取的文件
│   │   ├── develop.ts
│   │   ├── index.interface.ts
│   │   ├── local.ts
│   │   ├── production.ts
│   │   └── test.ts
│   ├── error # 错误枚举
│   │   └── index.ts
│   ├── integration # 向外发送请求的方法
│   │   ├── index.module.ts
│   │   └── index.service.ts
│   ├── main.ts # 入口文件
│   └── module # 业务 module
│       ├── officer # 工单 model
│       │   └── index.model.ts
│       ├── order # 订单业务
│       │   ├── index.controller.ts
│       │   ├── index.dto.ts # 校验转换入参
│       │   ├── index.enum.ts
│       │   ├── index.model.ts
│       │   ├── index.module.ts
│       │   └── index.service.ts
│       ├── pay # 支付 model
│       │   └── index.model.ts
│       ├── product # 产品 model
│       │   └── index.model.ts
│       └── refund # 退款 model
│           └── index.model.ts
├── tsconfig.json
├── tslint.json
└── yarn.lock
```

## 数据表结构

### 订单表 - order

|          字段           |    类型     | 备注                                                 |
| :---------------------: | :---------: | ---------------------------------------------------- |
|        order_id         | varchar(45) | 订单号                                               |
|           gid           | varchar(45) | 全局 Id                                              |
|    merchant_order_id    |   varchar   | 商户订单号（前置条件信息）                           |
|    merchant_batch_id    |   varchar   | 商户批次号                                           |
|        batch_id         |   varchar   | 批次号                                               |
|       order_state       |    enum     | 订单状态                                             |
|      creator_type       |    enum     | 创建人类型                                           |
|       creator_id        | varchar(45) | 创建人 Id                                            |
|         user_id         | varchar(45) | 用户 Id                                              |
|        username         |   varchar   | 用户名                                               |
|     user_company_id     |   varchar   | 用户公司 Id                                          |
|       manager_id        | varchar(45) | 客户经理 Id                                          |
|  manager_department_id  | varchar(45) | 客户经理部门 Id                                      |
|      creator_name       |   varchar   | 创建人名                                             |
|        user_name        |   varchar   | 用户名称                                             |
|    user_company_name    |   varchar   | 用户公司名称                                         |
|      manager_name       |   varchar   | 客户经理名                                           |
| manager_department_name |   varchar   | 客户经理部门名称                                     |
|     contract_numero     |   varchar   | 合同号                                               |
|        pay_state        |    enum     | 支付状态                                             |
|     discount_amount     |     int     | 优惠金额                                             |
|     payable_amount      |     int     | 应付金额 adjustPrice (quotationAmount - offerAmount) |
|          note           |   varchar   | 备注                                                 |
|       order_type        |    enum     | 订单类型                                             |
|      precondition       |   varchar   | 前置条件                                             |
|    service_start_at     |  timestamp  | 服务开始时间                                         |
|       expired_at        |  timestamp  | 服务到期时间                                         |
|       is_invoice        |     int     | 是否开票 0 否 1 是                                   |
|      adjust_price       |     int     | 改价后的价格                                         |
|    adjust_price_memo    |   varchar   | 手动调价原因                                         |
|     if_apply_refund     |   boolean   | 是否申请退款                                         |
|     contract_state      |    enum     | 续约状态                                             |
|     expired_reason      |   varchar   | 服务到期原因                                         |
|     expired_remark      |   varchar   | 服务到期表备注                                       |
|       if_post_pay       |   boolean   | 是否后付费                                           |
|    paid_redirect_url    |   varchar   | 支付后跳转地址                                       |
|     order_sync_url      |   varchar   | 线上工单地址                                         |
|       is_expired        |     int     | 是否过期 0 未过期 1 过期                             |
|      new_order_id       |   varchar   | 升级、续费创建的新订单号                             |
|       product_id        |   varchar   | 关联产品表 order_product_id                          |
|         pay_id          |   varchar   | 关联支付表 order_pay_id                              |
|        refund_id        |   varchar   | 关联退款表 order_redund_id                           |
|         pay_url         |   varchar   | 与支付返回二维码或地址                               |

### 支付表 - pay

|            字段            |     类型     | 备注                           |
| :------------------------: | :----------: | ------------------------------ |
|        order_pay_id        | varchar(45)  | 关联字段                       |
|       actual_amount        |     int      | 实际支付金额                   |
|       quotation_type       |     enum     | 报价类型                       |
|          pay_type          |   varchar    | 支付类型                       |
|           pay_at           |  timestamp   | 支付时间                       |
|     pay_serial_number      | varchar(100) | 支付流水号                     |
|      pay_fail_message      | varchar(100) | 支付失败信息（线上汇款专用）   |
|          pay_note          | varchar(100) | 支付备注（线上汇款专用）       |
|    receipt_operator_id     | varchar(100) | 收款人 Id（线下汇款专用）      |
|   receipt_operator_name    | varchar(100) | 收款人姓名（线下汇款专用）     |
|    receipt_operation_at    |  timestamp   | 收款操作时间（线下回款专用）   |
|        receipt_info        | varchar(100) | 收款信息（线下汇款专用）       |
|      receipt_voucher       | varchar(100) | 收款凭证（线下汇款专用）       |
|        receipt_note        | varchar(100) | 收款备注（线下汇款专用）       |
| primary_remittance_account | varchar(100) | 初选汇款账号（线下汇款专用）   |
| primary_remittance_company | varchar(100) | 初选汇款公司名（线下汇款专用） |
|  primary_remittance_bank   | varchar(100) | 初选汇款开户行（线下汇款专用） |

### 工单表 - office

|       字段       |    类型     | 备注                      |
| :--------------: | :---------: | ------------------------- |
| order_officer_id | varchar(45) | 关联字段                  |
|   allot_state    |    enum     | 产品分配状态              |
|    allot_way     |    enum     | 产品分配方式 默认工单分配 |
|   allot_end_at   |  timestamp  | 产品分配结束时间          |
| allot_officer_id | varchar(45) | 工单号                    |

### 退款表 - refund

|         字段         |     类型     | 备注           |
| :------------------: | :----------: | -------------- |
|   order_refund_id    | varchar(45)  | 关联字段       |
|    refund_amount     |     int      | 退款金额       |
|     refund_state     |     enum     | 退款状态       |
|    refund_reason     | varchar(200) | 退款理由       |
|  refund_proposer_id  | varchar(40)  | 退款申请人     |
| refund_proposer_name | varchar(40)  | 退款申请人名称 |
| refund_serial_number | varchar(100) | 退款流水号     |
|  refund_audit_note   | varchar(100) | 退款处理意见   |
|   refund_back_way    | varchar(100) | 退款退回方式   |
|    refund_end_at     |  timestamp   | 退款结束时间   |
|  refund_officer_id   | varchar(100) | 退款工单号     |
|        remark        | varchar(255) | 处理意见       |

### 产品表 - product

|       字段       |     类型      | 备注                              |
| :--------------: | :-----------: | --------------------------------- |
| order_product_id |  varchar(45)  | 关联字段                          |
|    product_id    |  varchar(50)  | 产品 Id                           |
|      appid       |  varchar(50)  | appid                             |
|       name       |  varchar(50)  | 产品名                            |
|       code       |  varchar(50)  | 产品编码                          |
|      cat_id      |  varchar(50)  | 产品分类 Id                       |
|     cat_name     |  varchar(50)  | 产品分类名称                      |
|     dept_id      |  varchar(50)  | 产品归属部门 Id                   |
|   income_type    |  varchar(50)  | 收入计算方式                      |
|    is_refund     |    boolean    | 产品是否可以退款                  |
|   is_post_pay    |    boolean    | 产品是否可以后付费                |
|      is_api      |    boolean    | 产品是否有 api 接口对接的工单产品 |
|   open_type_id   | varchar(1024) | 产品开通服务工单分类 Id           |
|  close_type_id   | varchar(1024) | 产品关闭服务工单分类 Id           |
|     item_id      |  varchar(50)  | 产品套餐 Id                       |
|    item_code     |  varchar(50)  | 产品套餐 Code                     |
|    item_name     |  varchar(50)  | 产品套餐名称                      |
|    key_props     |     text      | 产品关键属性                      |
| service_content  |     text      | 产品服务内容                      |
|       type       |      int      | 产品报价                          |
|      price       |      int      | 产品报价                          |
|       unit       |    varchar    | 产品单位                          |
|    unit_count    |      int      | 产品数量                          |
|   is_pre_cond    |      int      | 是否需要前置条件                  |
|    is_foreign    |      int      | 是否国外版                        |
|   crm_prod_id    | varchar(2014) | CRM 产品 Id                       |
