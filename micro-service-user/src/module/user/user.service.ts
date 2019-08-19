import { BizFailedException } from '@common/middleware/biz-failed/biz-failed.exception';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { BizFailedCodeEnum } from '../../biz-failed/biz-failed.enum';
import { UserModel } from './user.model';
import { RedisService } from 'nestjs-redis';
const nanoid = require('nanoid');

@Injectable()
export class UserService {
  constructor(
    private readonly redisService: RedisService,
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
      throw new BizFailedException(BizFailedCodeEnum.USERNAME_OR_PASSWORD_WRONG);
    }

    const redisServiceClient = this.redisService.getClient();
    const sid = nanoid();
    await redisServiceClient.set(sid,JSON.stringify(user),'EX',24 * 60 * 60);
    return sid;
  }

  async index(query) {
    const {
      name,
    } = query;
    const qb = this.userRepository.createQueryBuilder('user');
    qb
      .select('username')
      .select('name','aliasName')
      .offset((query.getCurrent() - 1) * query.getPageSize())
      .limit(query.getPageSize());
    if(name){
      qb.where('name Like %:name%',{name})
    }
    return qb.getManyAndCount();
  }

  async showStatus(data) {
    const {
      userUuid,
    } = data;

    return this.userRepository.findOne({
      where: {
        userUuid,
      },
      select: ['status'],
    });
  }
}
