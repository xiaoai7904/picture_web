import React from 'react';

export const RouterConfig = [
  {
    path: '/home',
    name: 'Home',
    component: React.lazy(() => import('@/pages/pageView/PageView.view')),
  },
  {
    path: '/preview',
    name: 'Preview',
    component: React.lazy(() => import('@/pages/preview/Preview.view')),
  },
  {
    path: '/login',
    name: 'Login',
    component: React.lazy(() => import('@/pages/login/Login.view')),
  },
  {
    path: '/404',
    name: '404',
    component: React.lazy(() => import('@/components/404/404')),
  },
  {
    path: '/empty',
    name: 'empty',
    component: React.lazy(() => import('@/pages/empty/Empty')),
  },
  {
    path: '/setPwd',
    name: 'setPwd',
    component: React.lazy(() => import('@/pages/setPassword/SetPassword.view')),
  },
  {
    path: '/myLike',
    name: 'myLike',
    component: React.lazy(() => import('@/pages/myLike/MyLike.view'))
  },
  {
    path: '/homePage',
    name: 'homePage',
    component: React.lazy(() => import('@/pages/homepage/HomePage.view'))
  },
  {
    path: '/recharge',
    name: 'recharge',
    component: React.lazy(() => import('@/pages/recharge/Recharge.view'))
  },
  {
    path: '/setting',
    name: 'setting',
    component: React.lazy(() => import('@/pages/setting/Setting.view'))
  },
  {
    path: '/help',
    name: 'help',
    component: React.lazy(() => import('@/pages/setting/Help.view'))
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: React.lazy(() => import('@/pages/setting/Privacy.view'))
  },
  {
    path: '/comment',
    name: 'comment',
    component: React.lazy(() => import('@/pages/comment/Comment.view'))
  },
  {
    path: '/customerService',
    name: 'customerService',
    component: React.lazy(() => import('@/pages/customerService/CustomerService.view'))
  },
  {
    path: '/subscript',
    name: 'subscript',
    component: React.lazy(() => import('@/pages/subscription/Subscription.view'))
  }
];

export default RouterConfig;
