import { Result } from '#/axios';
import { UserInfo } from '#/store';

export interface LoginResultModel extends Result{
  userId: string | number;
  token: string;
  refreshToken: string;
  user: UserInfo;
  data: Object;
}