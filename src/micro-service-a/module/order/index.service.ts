import { IntegrationService } from '../../integration/index.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, Like, Repository } from 'typeorm';
import { Order } from './index.model';

@Injectable()
export class OrderMsService {
  constructor(
    private readonly integrationService: IntegrationService,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {
  }

  async create(body, user) {
    const {
      merchantBatchId,
      paidRedirectUrl,
      source,
      isPostPay,
      orders,
    } = body;
    const {
      userId,
      name,
    } = user;
  }
}

@Injectable()
export class OrderOpService {
  constructor(
    private readonly integrationService: IntegrationService,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async opIndex(query) {
    const {
      keyword,
      expiredAtStart,
      expiredAtEnd,
      payableAmountStart,
      payableAmountEnd,
      managerId,
      payableAmount,
      rowAddTimeStart,
      rowAddTimeEnd,
      orderState,
      refundState,
      managerDepartmentId,
    } = query;
    interface IFilter {
      orderId?: any;
      userId?: any;
      expiredAt?: any;
      managerId?: any;
      payableAmount?: any;
      rowAddTime?: any;
      orderState?: any;
      refundState?: any;
      managerDepartmentId?: any;
    }
    const filterParams: IFilter = {};
    if (keyword) {
      filterParams.orderId = keyword;
    }
    if (expiredAtStart && expiredAtEnd) {
      filterParams.expiredAt = Between(expiredAtStart, expiredAtEnd);
    }
    if (managerId) {
      filterParams.managerId = managerId;
    }
    if (payableAmount) {
      filterParams.payableAmount = Between(payableAmountStart, payableAmountEnd);
    }
    if (rowAddTimeStart && rowAddTimeEnd) {
      filterParams.rowAddTime = Between(rowAddTimeStart, rowAddTimeEnd);
    }
    if (orderState) {
      filterParams.orderState = orderState;
    }
    if (refundState) {
      filterParams.refundState = refundState;
    }
    if (managerDepartmentId) {
      filterParams.managerDepartmentId = managerDepartmentId;
    }
    return this.orderRepository.findAndCount({
      where: filterParams,
      skip: (query.getCurrent() - 1) * query.getPageSize(),
      take: query.getPageSize(),
    });
  }

  async opIndexByOrderIds(query) {
    const { orderIds } = query;
    return this.orderRepository.findOne({
      where: {
        orderId: In(orderIds.split(',')),
      },
    });
  }

  async opShow(params) {
    const { orderId } = params;
    return this.orderRepository.findOne({
      where: {
        orderId,
      },
    });
  }

  async opCreate(body, user) {
    const {
      merchantBatchId,
      paidRedirectUrl,
      source,
      isPostPay,
      orders,
    } = body;
    const {
      userId,
      name,
    } = user;
    const { data: productPriceData } = await this.integrationService.postProductPriceByCode({
      codes: orders.map(
        ({
           isForeign,
           itemId: productPackageId,
           itemCode: code,
           unit,
           type,
           priceType,
           unitCount,
         }) => ({
          isForeign,
          productPackageId,
          code,
          unit,
          userId,
          unitCount,
          priceType: priceType || type,
        }),
      ),
    });
    for (const productPriceItem of productPriceData) {
      console.log(1);
    }
  }

  async opCheckPrecondition(body) {
    const { data: productLineData } = await this.integrationService.getProductLine(body.appid);
    return this.integrationService.postOpenapiCallback({
      ...body,
      url: productLineData.preUrl,
    });
  }

  async opRefunds(query) {
    return this.orderRepository.findAndCount({
      where: {

      },
    });
  }

  async opAdjustPrice(query) {
    return this.orderRepository.findAndCount({
      where: {

      },
    });
  }

}

@Injectable()
export class OrderUcService {
  constructor(
    private readonly integrationService: IntegrationService,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {
  }

  async ucCreate(body, user) {
    const {
      merchantBatchId,
      paidRedirectUrl,
      source,
      isPostPay,
      orders,
    } = body;
    const {
      userId,
      name,
    } = user;
  }

  async ucPay(body, user) {

  }

  async ucIndex(query, user) {
    const {
      fuzzy,
      orderType,
      rowAddTimeStart,
      rowAddTimeEnd,
    } = query;
    const {
      id,
    } = user;
    interface IFilter {
      orderId?: any;
      orderType?: any;
      rowAddTime?: any;
      userId: string;
    }
    const filterParams: IFilter = {
      userId: id,
    };
    if (fuzzy) {
      filterParams.orderId = Like(`%${fuzzy}%`);
    }
    if (orderType) {
      filterParams.orderType = orderType;
    }
    if (rowAddTimeStart && rowAddTimeEnd) {
      filterParams.rowAddTime = Between(query.getRowAddTimeStart(), query.getRowAddTimeEnd());
    }
    return this.orderRepository.findAndCount({
      where: filterParams,
      skip: (query.getCurrent() - 1) * query.getPageSize(),
      take: query.getPageSize(),
      select: [
        'orderId',
        'orderType',
        'orderState',
        'rowAddTime',
        'adjustPrice',
      ],
      relations: [ 'product', 'pay.actualAmount' ],
    });
  }

  async ucShow(orderId: string, user) {

  }

  async ucCountByOrderState(query, user) {

  }

  async ucInvoiceTotalAmount(query, user) {

  }

  async ucPaidProductCounts(query, user) {

  }

  async ucUpdateState(body, user) {

  }
}
