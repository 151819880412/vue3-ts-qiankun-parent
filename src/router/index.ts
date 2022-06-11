import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import routes from './routes';
// import type { App } from 'vue';

 

// 白名单应该包含基本静态路由
const WHITE_NAME_LIST: string[] = [];

const getRouteNames = (array: any[]) =>
  array.forEach((item) => {
    WHITE_NAME_LIST.push(item.name);
    getRouteNames(item.children || []);
  });
getRouteNames([]);

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes as unknown as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 10000, top: 10000 }),
});


// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

// config router
export function setupRouter(app: any) {
  // export function setupRouter(app: App<Element>) {
  app.use(router);
}
