import React from 'react';

export const RouterConfig = [
  {
    path: '/home',
    name: 'Home',
    component: React.lazy(() => import('@/pages/pageView/PageView.view'))
  },
  {
    path: '/preview',
    name: 'Preview',
    component: React.lazy(() => import('@/pages/preview/Preview.view'))
  },
  {
    path: '/404',
    name: '404',
    component: React.lazy(() => import('@/components/404/404'))
  },
];

export default RouterConfig
