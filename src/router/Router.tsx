import { Switch, Route, Router, Redirect, HashRouter } from 'react-router-dom';
import pageHistory from './PageHistory';
import React, { ReactElement, Suspense } from 'react';
// import RouterInterceptor from './RouterInterceptor';
import { CommonProps } from '@/types/CommonProps';
import RouterConfig from './RouterConfig';

const PageLoading = () => {
  return <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',fontSize: '18px' }}>数据加载中...</div>;
};

export const RouterApp = (props: CommonProps): ReactElement => {
  return (
    <Router history={pageHistory}>
      {/* <HashRouter> */}
      <Suspense fallback={<PageLoading />}>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/home" push />} />
          {RouterConfig.map((router: any, index: any) => {
            return <Route key={index} path={router.path} component={router.component} />;
          })}
          <Redirect to="/404" />
        </Switch>
      </Suspense>
      {/* </HashRouter> */}
    </Router>
  );
};

export default RouterApp;
