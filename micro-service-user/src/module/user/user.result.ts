import { UserModel } from './user.model';

export class LoginResult {
  token: string;
}

export class IndexResult extends UserModel {}

export class ShowStatusResult {
  status: number;
}
