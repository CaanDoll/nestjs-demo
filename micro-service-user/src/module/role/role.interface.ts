import { IPageResponse } from '@common/base/base.controller';
import { IndexResult } from './role.result';
import { IndexDto } from './role.dto';

export interface IRoleInterface {
  index(query: IndexDto): Promise<IPageResponse<IndexResult>>
}