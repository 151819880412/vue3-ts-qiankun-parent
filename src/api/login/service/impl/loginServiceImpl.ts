



import { defHttp } from '@/utils/http';
import LoginService from '../loginService';
import { LoginResultModel } from '../../model/userModel';

export default class LoginServiceImpl implements LoginService {

  /**
   * 用户登录 LoginServiceImpl
   * @date 2022-03-02
   * @param {any} data:object
   * @returns {any}
   */
  public login(data: object): Promise<LoginResultModel> {
    return defHttp.post<LoginResultModel>({ url: '/genuine-system/auth/token/get', data });
  }

  public queryRoleMenuList(data:any={}): Promise<LoginResultModel> {
    return defHttp.post<LoginResultModel>({ url: '/market/category/page/1/10',data});
  }

}