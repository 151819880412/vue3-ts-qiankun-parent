
import { RouteRecordRaw } from 'vue-router';

import AppLayout from '@/views/layout/AppLayout.vue'
import A from '@/views/A/a.vue'
import B from '@/views/B/b.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'AppLayout',
    component: AppLayout,
    children:[
      {
        path: '/a',
        name: 'A',
        component: A,
      },
      {
        path: '/b',
        name: 'B',
        component: B,
      },
    ]
  },
];
export default routes;