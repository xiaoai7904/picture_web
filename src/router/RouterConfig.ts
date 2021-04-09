import React from 'react';

export const RouterConfig = [
  {
    path: '/',
    name: 'Home',
    component: React.lazy(() => import('@/pages/pageView/PageView.view'))
  },
];

export default RouterConfig
