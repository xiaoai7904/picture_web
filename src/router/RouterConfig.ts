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
];

export default RouterConfig
