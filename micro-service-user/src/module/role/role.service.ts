import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { RoleModel } from './role.model';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleModel)
    private readonly roleRepository: Repository<RoleModel>,
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
