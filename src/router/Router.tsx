import { Switch, Route, Router, Redirect, HashRouter } from 'react-router-dom';
import pageHistory from './PageHistory';
import React, { ReactElement, Suspense } from 'react';
import RouterInterceptor from './RouterInterceptor';
import { CommonProps } from '@/types/CommonProps';
import RouterConfig from './RouterConfig';

const PageLoading = () => {
  return <div>loading...</div>;
};

export const RouterApp = (props: CommonProps): ReactElement => {
  return (
    // 建议使用history模式 因为部署到githuapages原因暂时使用hash路由模式
    <Router history={pageHistory}>
    {/* <HashRouter> */}
      <Suspense fallback={<PageLoading />}>
        <Switch>
          {RouterConfig.map((router: any, index: any) => {
            return <Route key={index} path={router.path} component={router.component} />;
            // return <RouterInterceptor {...props} key={index} path={router.path} router={router} />;
          })}
        </Switch>
      </Suspense>
    {/* </HashRouter> */}
    </Router>
  );
};

export default RouterApp;
