import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { OrderModel } from './order.model';
import { IndexDto } from './order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderModel)
    private readonly orderModelRepository: Repository<OrderModel>,
  ) {
  }

  async index(query: IndexDto) {
    const {
      name,
    } = query;

    interface IFilter {
      name?: any;
    }

    const filterParams: IFilter = {};
    if (name) {
      filterParams.name = Like(`%${name}%`);
    }
    return this.orderModelRepository.findAndCount({
      where: filterParams,
      skip: (query.getCurrent() - 1) * query.getPageSize(),
      take: query.getPageSize(),
    });
  }

  async create(body){
    const {
      userUuid,
      totalMount,
      desc,
    } = body;
    return this.orderModelRepository.save({
      userUuid,
      totalMount,
      desc,
    });
  }

  async destroy(param){
    const {
      uuid,
    } = param;
    return this.orderModelRepository.delete({
      uuid,
    });
  }
}
