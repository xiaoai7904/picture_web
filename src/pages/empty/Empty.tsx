import React from 'react';
import { useGlobalStore } from '@/store/StoreContext';
import Http from '@/module/http/Http';
import SystemConfig from '@/module/systemConfig/SystemConfig';
import PageHistory from '@/router/PageHistory';

export default function Empty() {
  const { globalStore } = useGlobalStore();

  const getUserInfo = () => {
    Http.of()
      ?.post(SystemConfig.getUserInfo, {})
      .then((data: any) => {
        globalStore.setUserInfo(data.data.data.userinfo);
        PageHistory.replace('/home')
      });
  };

  getUserInfo()

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',fontSize: '18px' }}>
      数据加载中...
    </div>
  );
}
