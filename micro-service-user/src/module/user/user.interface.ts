import { IPageResponse, IResponse } from '@common/base/base.controller';
import { IndexResult, LoginResult, ShowStatusResult } from './user.result';
import { IndexDto, LoginDto, ShowStatusDto } from './user.dto';

export interface IUserGrpcInterface {
  showStatus(data: ShowStatusDto): Promise<ShowStatusResult>
}

export interface IUserInterface extends IUserGrpcInterface{
  login(body: LoginDto): Promise<IResponse<LoginResult>>
  index(query: IndexDto): Promise<IPageResponse<IndexResult>>
}