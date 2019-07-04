/**
 * 订单创建人类型
 * @enum USER USER 用户
 * @enum ADMIN ADMIN 运营人员
 * @enum API API API接口
 */
export enum OrderCreatorType {
  USER = "USER",
  ADMIN = "ADMIN",
  API = "API"
}

/**
 * 订单状态
 * @enum CREATE CREATE 0.已创建
 * @enum CONFIRMED CONFIRMED 1.已确认* 所有逻辑等同已创建
 * @enum POST_PAID POST_PAID 1.后付费 * 后付费等待订单支付
 * @enum LAUNCHED_PAY LAUNCHED_PAY 2. 已发起过支付（支付中） 不可修改价格
 * @enum PAID PAID 3.已支付 支付成功后 可开票 可发起退款
 * @enum DUMPED DUMPED 3.已作废 支付成功前可以作废
 * @enum ALLOCATED ALLOCATED 4.已分配 服务到期后交易关闭
 * @enum LAUNCHED_REFUND LAUNCHED_REFUND 5. 已启动退款 订单发起退款后启动退款流程 退款成功以后交易关闭
 * @enum CLOSED CLOSED 5.退款成功
 * Q: 不存在支付过期
 */
export enum OrderState {
  CREATE = "CREATE",
  WAIT_PAY = "WAIT_PAY",
  POST_PAID = "POST_PAID",
  PAID = "PAID",
  DUMPED = "DUMPED",
  COMPLETE = "COMPLETE",
  CLOSED = "CLOSED"
}
/**
 * 订单状态
 * @enum CREATE CREATE 0.已创建
 * @enum LAUNCHED_PAY LAUNCHED_PAY 2. 已发起过支付（支付中） 不可修改价格
 * @enum PAID PAID 3.已支付 支付成功后 可开票 可发起退款
 * @enum DUMPED DUMPED 3.已作废 支付成功前可以作废
 * @enum ALLOCATED ALLOCATED 4.已分配(已完成) 服务到期后交易关闭
 * @enum LAUNCHED_REFUND LAUNCHED_REFUND 4.5. 已启动退款 订单发起退款后启动退款流程 退款成功以后交易关闭
 * @enum CLOSED CLOSED 6.退款成功
 */
export enum OrderState2 {
  CREATE = "CREATE",
  LAUNCHED_PAY = "LAUNCHED_PAY",
  PAID = "PAID",
  DUMPED = "DUMPED",
  COMPLETE = "COMPLETE",
  CLOSED = "CLOSED"
}

/**
 * 订单类型
 * @enum NEW NEW 新购
 * @enum UPGRADE UPGRADE 升级
 * @enum RENEWAL RENEWAL 续期
 */
export enum OrderType {
  NEW = "NEW",
  UPGRADE = "UPGRADE",
  RENEWAL = "RENEWAL"
}

/**
 * 工单分配状态
 * @enum WAIT_ALLOT WAIT_ALLOT 待分配
 * @enum ALLOTTING ALLOTTING 分配中
 * @enum ALLOT_FAIL ALLOT_FAIL 分配中
 * @enum COMPLETE COMPLETE 已分配
 */
export enum AllotState {
  WAIT_ALLOT = "WAIT_ALLOT",
  ALLOTTING = "ALLOTTING",
  ALLOT_FAIL = "ALLOT_FAIL",
  COMPLETE = "COMPLETE"
}

/**
 * 资源分配方式
 * @enum OFFICER OFFICER 工单分配
 */
export enum AllotWay {
  OFFICER = "OFFICER"
}

/**
 * 订单支付方式
 * @enum OFFLINE OFFLINE 线下付款
 * @enum WECHAT WECHAT 微信
 * @enum ALIPAY ALIPAY 支付宝
 * @enum BALANCE BALANCE 余额支付
 */
export enum OrderPayType {
  OFFLINE = "OFFLINE",
  WECHAT = "WECHAT",
  ALIPAY = "ALIPAY",
  BALANCE = "BALANCE"
}

/**
 * 订单支付状态
 * @enum NOT_PAY NOT_PAY 未支付
 * @enum PAY_FAIL PAY_FAIL 支付失败
 * @enum PAID PAID 已支付
 */
export enum OrderPayState {
  NOT_PAY = "NOT_PAY",
  PAY_FAIL = "PAY_FAIL",
  PAID = "PAID"
}

/**
 * 订单报价类型
 * @enum NORMAL NORMAL 普通价
 * @enum ONLINE ONLINE 网销价
 * @enum OFFLINE OFFLINE 线下价
 * @enum DISCOUNT DISCOUNT 活动价
 * @enum AGENT AGENT 代理商价
 */
export enum OrderQuotationType {
  NORMAL = "NORMAL",
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
  DISCOUNT = "DISCOUNT",
  AGENT = "AGENT"
}

/**
 * 订单来源
 * @enum PC PC
 * @enum H5 H5
 * @enum ADMIN ADMIN
 */
export enum OrderSource {
  PC = "PC",
  H5 = "H5",
  ADMIN = "ADMIN"
}

/**
 * 预付费或者后付费
 */
export enum PayPreOrPost {
  PRE = 0,
  POST = 1
}

/**
 * 系统环境
 * @enum DEV DEV development 开发环境
 * @enum PROD PROD production 生产环境
 * @enum TEST TEST test 测试环境
 * @enum PRE_PUBLISH PRE_PUBLISH prepublish 预发布环境
 * @enum LOCAL LOCAL local 本地环境
 */
export enum Environment {
  DEV = "development",
  PROD = "production",
  TEST = "test",
  PRE_PUBLISH = "prepublish",
  LOCAL = "local"
}

export enum ErrorCode {
  PREPAY_PAID_ORDER = 10030001,
  FAIL_LOCK_INVENTORY,
  FAIL_CONFIRM_LOCK_INVENTORY,
  FAIL_GET_PRODUCT_INFO,
  FAIL_VALIDATE_REQUEST_PARAMS,

  FAIL_GET_MANAGER_INFO,
  FAIL_UPDATE_PAID_ORDER,
  INVALID_ORDER_NUMBER,
  FAIL_ADD_WORK_OFFICE,
  FAIL_GET_USER_MANAGER_INFO,

  FAIL_UPDATE_ORDER_STATE,
  SYSTEM_ERROR,
  FAIL_ADD_ORDER,
  FAIL_ADD_REFUND,
  UN_AUTHENTICATED,

  INVALID_ORDER_ADJUST_PRICE,
  INVALID_PRODUCT,
  INVALID_ACTION
}

export enum ErrorCode2 {
  PREPAY_PAID_ORDER = 401,
  FAIL_LOCK_INVENTORY,
  FAIL_CONFIRM_LOCK_INVENTORY,
  FAIL_GET_PRODUCT_INFO,
  FAIL_VALIDATE_REQUEST_PARAMS,

  FAIL_GET_MANAGER_INFO,
  FAIL_UPDATE_PAID_ORDER,
  INVALID_ORDER_NUMBER,
  FAIL_ADD_WORK_OFFICE,
  FAIL_GET_USER_MANAGER_INFO,

  FAIL_UPDATE_ORDER_STATE,
  SYSTEM_ERROR,
  FAIL_ADD_ORDER,
  FAIL_ADD_REFUND,
  UN_AUTHENTICATED,

  INVALID_ORDER_ADJUST_PRICE,
  INVALID_PRODUCT,
  INVALID_ACTION,
  INVALID_BATCH_ORDER_DATA,
  FAIL_UPLOAD_FILE,

  SUB_SYSTEM_ERROR,
  INVALID_REFUND_AMOUNT,
  WITHOUT_USER_ID,
  INVALID_TIME_STRING,
  MISS_PRECONDITION,

  FAIL_CHECK_PRECONDITION,
  NO_REFUND_PRODUCT
}

/**
 * @enum APPLIED APPLIED 已申请
 * @enum RESOLVED RESOLVED 已通过
 * @enum REJECTED REJECTED 已驳回
 * @enum REFUND REFUND 已退款
 */
export enum RefundState {
  APPLIED = "APPLIED",
  RESOLVED = "RESOLVED",
  REJECTED = "REJECTED",
  REFUND = "REFUND"
}

/**
 * @enum RESOLVED RESOLVED 已通过
 * @enum REJECTED REJECTED 已驳回
 */
export enum RefundResult {
  RESOLVED = "RESOLVED",
  REJECTED = "REJECTED"
}

/**
 * CONTRACT CONTRACT 已续约
 * NOT_CONTRACT NOT_CONTRACT 未续约
 */
export enum ContractState {
  CONTRACT = "CONTRACT",
  NOT_CONTRACT = "NOT_CONTRACT"
}

export enum IfInvoice {
  YES = 0,
  NO = 1
}

/**
 * 订单消息数据类型
 * @enum ORDER_PAID ORDER_PAID 订单支付成功
 * @enum POST_PAY_ORDER_OKAY POST_PAY_ORDER_OKAY 后付费下单成功
 * @enum REFUND_OKAY REFUND_OKAY 订单退款成功
 * @enum ORDER_COMPLETE ORDER_COMPLETE 订单服务开通完成
 * @enum WILL_EXPIRED_NOTIFY_USER WILL_EXPIRED_NOTIFY_USER 订单即将过期
 * @enum WILL_EXPIRED_NOTIFY_MANAGER WILL_EXPIRED_NOTIFY_MANAGER 订单即将过期
 */
export enum OrderMailDataType {
  ORDER_PAID = "ORDER_PAID",
  POST_PAY_ORDER_OKAY = "ORDER_POST_PAY_OKAY",
  REFUND_OKAY = "REFUND_OKAY",
  ORDER_COMPLETE = "ORDER_COMPLETE",
  EXPIRED_TO_USER = "EXPIRED_TO_USER",
  EXPIRED_TO_MANAGER = "EXPIRED_TO_MANAGER"
}

