import { IPageResponse, IResponse } from '@common/base/base.controller';
import { IndexResult } from './order.result';
import { IndexDto, CreateDto } from './order.dto';

export interface IOrderInterface {
  index(query: IndexDto): Promise<IPageResponse<IndexResult>>
  create(body: CreateDto): Promise<IResponse<void>>
}