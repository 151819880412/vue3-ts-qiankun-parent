import { LoginResultModel } from "../model/userModel";

/**
 * 用户登录 LoginService
 * @date 2022-03-02
 * @param {any} data:object
 * @returns {any}
 */
export default interface LoginService {
  
  // 登录
  login(data: object): Promise<LoginResultModel>;

  // 权限
  queryRoleMenuList(userId:string): Promise<LoginResultModel>;

}