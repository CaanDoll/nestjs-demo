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
