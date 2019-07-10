import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Order } from './index.model';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly httpService: HttpService,
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

  async opShow(params) {
    const { orderId } = params;
    return this.orderRepository.findOne({
      where: {
        orderId,
      },
    });
  }

  async opCreate(body) {
    const res = await this.httpService.get('https://www.baidu.com');
    console.log(res);
    await this.orderRepository.findAndCount({
      where: {

      },
    });
  }

  async opCheckPrecondition(query) {
    return this.orderRepository.findAndCount({
      where: {

      },
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
