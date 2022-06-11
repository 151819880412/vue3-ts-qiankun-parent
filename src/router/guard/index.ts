import type { Router, RouteLocationNormalized } from 'vue-router';
// import { useAppStoreWithOut } from '/@/store/modules/app';
// import { useUserStoreWithOut } from '/@/store/modules/user';
import { AxiosCanceler } from '@/utils/http/axiosCancel';
import { unref } from 'vue';
import { createPermissionGuard } from './permissionGuard';
import { createStateGuard } from './stateGuard';
import nProgress from 'nprogress';
import { createParamMenuGuard } from './paramMenuGuard';

// 不要改变创造的顺序
export function setupRouterGuard(router: Router) {
  createPageGuard(router);
  createPageLoadingGuard(router);
  createHttpGuard(router);
  createScrollGuard(router);
  createMessageGuard(router);
  createProgressGuard(router);
  createPermissionGuard(router);
  createParamMenuGuard(router); // 必须在createPermissionGuard（菜单已生成）之后执行
  createStateGuard(router);
}

/**
 * 处理页面状态的钩子
 */
function createPageGuard(router: Router) {
  console.log('createPageGuard');
  const loadedPageMap = new Map<string, boolean>();

  router.beforeEach(async (to) => {
    // 页面已经加载，再次打开会更快，不需要进行加载和其他处理
    to.meta.loaded = !!loadedPageMap.get(to.path);
    // 通知路由更改

    return true;
  });

  router.afterEach((to) => {
    loadedPageMap.set(to.path, true);
  });
}

// 用于处理页面加载状态
function createPageLoadingGuard(router: Router) {
  console.log('createPageLoadingGuard');

  // const userStore = useUserStoreWithOut();
  const userStore = {
    getToken: () => true
  };
  // const appStore = {};
  router.beforeEach(async (to) => {
    if (!userStore.getToken) {
      return true;
    }
    if (to.meta.loaded) {
      return true;
    }



    return true;
  });
  router.afterEach(async () => {

    return true;
  });
}

/**
 * 切换路由时，用于关闭当前页面以完成请求的界面
 * @param router
 */
function createHttpGuard(router: Router) {
  console.log('createHttpGuard');

  let axiosCanceler: Nullable<AxiosCanceler>;
  axiosCanceler = new AxiosCanceler();
  router.beforeEach(async () => {
    // 切换路由将删除上一个请求
    axiosCanceler?.removeAllPending();
    return true;
  });
}

// 路由开关返回顶部
function createScrollGuard(router: Router) {
  console.log('createScrollGuard');

  const isHash = (href: string) => {
    return /^#/.test(href);
  };

  const body = document.body;

  router.afterEach(async (to) => {
    // 滚动顶部
    isHash((to as RouteLocationNormalized & { href: string; })?.href) && body.scrollTo(0, 0);
    return true;
  });
}

/**
 * 用于在切换路由时关闭消息实例
 * @param router
 */
export function createMessageGuard(router: Router) {
  console.log('createMessageGuard');


  router.beforeEach(async () => {
    try {
    } catch (error) {
      console.warn('message guard error:' + error);
    }
    return true;
  });
}

export function createProgressGuard(router: Router) {
  console.log('createProgressGuard');

  const getOpenNProgress = true;
  router.beforeEach(async (to) => {
    if (to.meta.loaded) {
      return true;
    }
    unref(getOpenNProgress) && nProgress.start();
    return true;
  });

  router.afterEach(async () => {
    unref(getOpenNProgress) && nProgress.done();
    return true;
  });
}
