import React from 'react';
import { useGlobalStore } from '@/store/StoreContext';
import { observer } from 'mobx-react';
import RouterApp from '@/router/Router';
import Http from '@/module/http/Http';
import SystemConfig from '@/module/systemConfig/SystemConfig';
import PageHistory from '@/router/PageHistory';
import '@/style/system.less';
import vhCheck from 'vh-check'

vhCheck()

const App = observer(() => {
  const { globalStore } = useGlobalStore();
  const getUserInfo = () => {
    Http.of()
      ?.post(SystemConfig.getUserInfo, {})
      .then((data: any) => {
        globalStore.setUserInfo(data.data.data.userinfo);
      });
  };

  if (['/login', '/404', '/empty', '/setPwd'].indexOf(PageHistory.location.pathname) < 0) {
    getUserInfo();
  }

  return <RouterApp />;
});

export default App;
