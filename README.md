## 目录结构

```bash
# common
├── base # 基类
│   ├── base.controller.ts # Controller 基类
│   ├── base.dto.ts # Dto 基类
│   └── base.model.ts # Model 基类
├── config # 配置读取 module
├── http # 请求 module（对外发送请求）
├── logger # 日志 module
├── middleware # 中间件（包括管道、异常捕获器、守卫、拦截器）
│   ├── biz-failed # 业务失败处理
│   ├── logger # 日志处理
│   └── session # 鉴权处理
└── util # 公用方法
```

```bash
# micro-service
├── app.module.ts # 全局 module
├── main.ts # 入口文件
├── config # 配置文件
│   ├── develop.ts
│   ├── config.interface.ts
│   ├── local.ts
│   ├── production.ts
│   └── test.ts
├── biz-failed # 错误枚举
│   └── biz-failed.enum.ts
├── integration # 向外发送请求的方法
│   ├── user.module.ts
│   └── user.service.ts
└── module # 业务 module
    ├── user # 用户 业务
    │   ├── user.module.ts # 用户 module
    │   ├── user.model.ts # 用户 model
    │   ├── user.controller.ts # 用户 controller
    │   ├── user.dto.ts # 用户入参
    │   ├── user.result.ts # 用户出参
    │   ├── user.enum.ts # 用户相关枚举
    │   └── user.service.ts # 用户 service 
    ├── role # 角色 业务
        └── 同上
