import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './index.model';

@Injectable()
export class OrderService{
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async opIndex(query) {
    return this.orderRepository.findAndCount({
      where: {

      }
    })
  }
}
