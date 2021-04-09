import React from 'react';
import { Route } from 'react-router-dom';
import PageView from '@/pages/pageView/PageView.view';
import { CommonProps, Location } from '@/types/CommonProps';

export interface RouteInterceptorProps extends CommonProps {
  path: string;
  router: any;
  location: Location;
}

export const RouteInterceptor = (props: RouteInterceptorProps) => {
  const { path } = props;
  
  return <Route path={path} render={(props: any) => <PageView {...props} />} />;
};

export default RouteInterceptor;
