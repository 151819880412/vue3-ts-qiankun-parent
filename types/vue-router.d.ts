export {};

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    orderNo?: number;
    // title
    title: string;
    // 是否忽略权限
    ignoreAuth?: boolean;
    // role info
    roles?: RoleEnum[];
    //是否不缓存
    ignoreKeepAlive?: boolean;
    // 固定在账单上了吗
    affix?: boolean;
    // icon on tab
    icon?: string;
    frameSrc?: string;
    // 当前页面转换
    transitionName?: string;
    // Whether the route has been dynamically added
    hideBreadcrumb?: boolean;
    // Hide submenu
    hideChildrenInMenu?: boolean;
    // Carrying parameters
    carryParam?: boolean;
    // Used internally to mark single-level menus
    single?: boolean;
    // Currently active menu
    currentActiveMenu?: string;
    // Never show in tab
    hideTab?: boolean;
    // Never show in menu
    hideMenu?: boolean;
    isLink?: boolean;
    // only build for Menu
    ignoreRoute?: boolean;
    // Hide path for children
    hidePathForChildren?: boolean;
  }
}
