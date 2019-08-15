import { BasePageDto } from '@common/base/dto';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import {
  ArrayContains,
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean, IsDateString,
  IsEnum, IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';
import {
  EnumIsForeign,
  OrderQuotationType,
  OrderSource,
} from './index.enum';

export class OpIndexDto extends BasePageDto {
  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  orderState?: string;

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  refundState?: string;

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  expiredAtStart?: string;

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  expiredAtEnd?: string;

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  payableAmountStart?: string;

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  payableAmountEnd?: string;

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  managerId?: string;

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  payableAmount?: string;

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  rowAddTimeStart?: string;

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  rowAddTimeEnd?: string;

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  managerDepartmentId?: string;
}

export class OpIndexByOrderIdsDto {
  @IsNotEmpty()
  @ApiModelProperty()
  @IsString()
  orderIds: string;
}

export class OpShowDto {
  @IsNotEmpty()
  @ApiModelProperty()
  @IsString()
  orderId: string;
}

class OpCreateOrderItemDto {
  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  @Length(1, 40)
  precondition?: string;

  @IsNotEmpty()
  @ApiModelProperty()
  @IsString()
  @Length(1, 40)
  itemId: string;

  @IsNotEmpty()
  @ApiModelProperty()
  @IsNumber()
  @Min(1)
  unitCount: number;

  @IsNotEmpty()
  @ApiModelProperty()
  @IsString()
  unit: string;

  @IsNotEmpty()
  @ApiModelProperty()
  @IsEnum(OrderQuotationType)
  priceType: OrderQuotationType;

  @IsOptional()
  @ApiModelPropertyOptional()
  @Min(0)
  @IsInt()
  @IsNumber()
  adjustPrice?: number;

}

export class OpCreateDto {
  @IsNotEmpty()
  @ApiModelProperty()
  @IsString()
  @Length(1, 40)
  userId: string;

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  @Length(1, 40)
  precondition?: string;

  @IsNotEmpty()
  @ApiModelProperty()
  @IsEnum(OrderSource)
  source: OrderSource;

  @IsNotEmpty()
  @ApiModelProperty({ type: [ OpCreateOrderItemDto ] })
  @IsArray()
  @ArrayMaxSize(6)
  @ArrayContains([ OpCreateOrderItemDto ])
  orders: OpCreateOrderItemDto[];

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsBoolean()
  isPostPay: boolean;
}

export class OpCheckPreconditionDto {
  @IsNotEmpty()
  @ApiModelProperty()
  @IsString()
  appid: string;

  @IsNotEmpty()
  @ApiModelProperty()
  @IsString()
  content: string;
}

class MsSingleOrderParams {
  @IsNotEmpty()
  @IsString()
  prodCode: string;

  @IsNotEmpty()
  @IsString()
  itemCode: string;

  @IsNotEmpty()
  @Min(1)
  @IsInt()
  unitCount: number;

  @IsNotEmpty()
  @IsString()
  unit: string;

  @IsNotEmpty()
  @IsEnum(EnumIsForeign)
  isForeign: 0 | 1;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsDateString()
  serviceStartAt?: Date;

  @IsOptional()
  @IsDateString({ message: '订单过期时间错误' })
  expiredAt?: Date;

  @IsString()
  @IsOptional()
  merchantOrderId?: string;
}

export class MsCreateDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsEnum(OrderSource)
  source: OrderSource;

  @IsOptional()
  paidRedirectUrl?: string;

  @IsNotEmpty()
  @IsString()
  merchantBatchId: string;

  @IsNotEmpty()
  @ArrayContains([ MsSingleOrderParams ])
  @ArrayMaxSize(5, {
    message: '最多同时添加 5 笔订单',
  })
  @ArrayMinSize(1, {
    message: '至少一笔订单',
  })
  @IsArray({
    message: '订单数据类型错误',
  })
  orders: MsSingleOrderParams[];
}

export class UcAddOrdersPayItemDto {
  @IsOptional()
  @ApiModelPropertyOptional()
  @Length(1, 40)
  @IsString()
  orderId: string;

  @IsArray()
  @ApiModelProperty()
  couponIds: string[];

  @IsOptional()
  @ApiModelPropertyOptional()
  @Length(1, 40)
  @IsString()
  couponCode?: string;
}

export class UcPayDto {
  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  returnUrl?: string;

  @IsOptional()
  @ApiModelPropertyOptional()
  @Length(1, 40)
  @IsString()
  batchId?: string;

  @IsNotEmpty()
  @ApiModelProperty({ type: [ UcAddOrdersPayItemDto ] })
  @ArrayMinSize(1)
  @IsArray()
  orders: UcAddOrdersPayItemDto[];

  @IsNotEmpty()
  @ApiModelProperty()
  @IsString()
  payType: string;
}

export class UcIndexDto extends BasePageDto {
  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  fuzzy?: string;

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  orderType?: string;

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  rowAddTimeStart?: string;

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  rowAddTimeEnd?: string;

  getRowAddTimeStart() {
    return this.rowAddTimeStart ? new Date(this.rowAddTimeStart) : undefined;
  }

  getRowAddTimeEnd() {
    return this.rowAddTimeEnd ? new Date(this.rowAddTimeEnd) : undefined;
  }
}

export class UcShowDto {
  @IsNotEmpty()
  @ApiModelProperty()
  @IsString()
  orderId: string;
}

export class UcCountByOrderStateDto {

}

export class UcInvoiceTotalAmountDto {

}

export class UcPaidProductCountsDto {

}

export class UcUpdateStateDto {

}
