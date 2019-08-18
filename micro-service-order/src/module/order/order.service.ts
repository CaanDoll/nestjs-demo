import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { IntegrationService } from '../../integration/index.service';
import { OrderModel } from './order.model';

@Injectable()
export class OrderService {
  constructor(
    private readonly integrationService: IntegrationService,
    @InjectRepository(OrderModel)
    private readonly roleRepository: Repository<OrderModel>,
  ) {
  }

  async opIndex(query) {
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
    return this.roleRepository.findAndCount({
      where: filterParams,
      skip: (query.getCurrent() - 1) * query.getPageSize(),
      take: query.getPageSize(),
    });
  }
}
