import { BizFailedException } from '../../../../common/http/biz-failed';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { BizFailedCodeEnum } from '../../biz-failed/biz-failed.enum';
import { IntegrationService } from '../../integration/index.service';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
  constructor(
    private readonly integrationService: IntegrationService,
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {
  }

  async login(body) {
    const {
      username,
      password,
    } = body;

    const user = await this.userRepository.findOne({
      where: {
        username,
        password,
      },
    });

    if (!user) {
      throw BizFailedException(BizFailedCodeEnum.USERNAME_OR_PASSWORD_WRONG);
    }

    const redisServiceClient = this.redisService.getClient();

    const filterParams: IFilter = {};
    if (name) {
      filterParams.name = Like(`%${name}%`);
    }
    return this.userRepository.findAndCount({
      where: filterParams,
      skip: (query.getCurrent() - 1) * query.getPageSize(),
      take: query.getPageSize(),
    });
  }

  async index(query) {
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
    return this.userRepository.findAndCount({
      where: filterParams,
      skip: (query.getCurrent() - 1) * query.getPageSize(),
      take: query.getPageSize(),
    });
  }
}
