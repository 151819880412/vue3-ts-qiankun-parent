import type { Router } from 'vue-router';


import { PageEnum } from '@/enums/pageEnum';


const PAGE_NOT_FOUND_ROUTE = {
  name: '123'
};

const LOGIN_PATH = PageEnum.BASE_LOGIN;

const ROOT_PATH = '123';

const whitePathList: PageEnum[] = [LOGIN_PATH];

export function createPermissionGuard(router: Router) {
  const userStore = {
    getUserInfo: {
      homePath: ''
    },
    getToken: 1,
    getSessionTimeout: 1,
    afterLoginAction: () => { },
    getLastUpdateTime: (): number => {
      return 1;
    }
  };
  router.beforeEach(async (to, from, next) => {
    if (
      from.path === ROOT_PATH &&
      to.path === PageEnum.BASE_HOME &&
      userStore.getUserInfo.homePath &&
      userStore.getUserInfo.homePath !== PageEnum.BASE_HOME
    ) {
      next(userStore.getUserInfo.homePath);
      return;
    }

    const token = userStore.getToken;

    // Whitelist can be directly entered
    if (whitePathList.includes(to.path as PageEnum)) {
      if (to.path === LOGIN_PATH && token) {
        const isSessionTimeout = userStore.getSessionTimeout;
        try {
          await userStore.afterLoginAction();
          if (!isSessionTimeout) {
            next((to.query?.redirect as string) || '/');
            return;
          }
        } catch { }
      }
      next();
      return;
    }

    // token does not exist
    if (!token) {
      // You can access without permission. You need to set the routing meta.ignoreAuth to true
      if (to.meta.ignoreAuth) {
        next();
        return;
      }

      // redirect login page
      const redirectData: { path: string; replace: boolean; query?: Recordable<string>; } = {
        path: LOGIN_PATH,
        replace: true,
      };
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path,
        };
      }
      next(redirectData);
      return;
    }

    // Jump to the 404 page after processing the login
    if (
      from.path === LOGIN_PATH &&
      to.name === PAGE_NOT_FOUND_ROUTE.name &&
      to.fullPath !== (userStore.getUserInfo.homePath || PageEnum.BASE_HOME)
    ) {
      next(userStore.getUserInfo.homePath || PageEnum.BASE_HOME);
      return;
    }

    next();

  });
}
