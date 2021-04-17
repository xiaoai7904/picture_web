import React from 'react';
import { Tabs, NavBar, Icon } from 'antd-mobile';
import PageList from '@/components/pageList/PageList.view';
import { useGlobalStore } from '@/store/StoreContext';
import Http from '@/module/http/Http';
import SystemConfig from '@/module/systemConfig/SystemConfig';
import PageHistory from '@/router/PageHistory';
import './Home.style.less';

export default function HomeView() {
  const tabs = [{ title: '免费体验' }, { title: 'VIP畅享' }, { title: '最新' }, { title: '推荐' }];
  const { globalStore } = useGlobalStore();

  console.log(globalStore)
  return (
    <>
      <NavBar mode="dark" leftContent="HaiHai" rightContent={[<Icon key="0" type="search" />]} />
      <Tabs tabs={tabs} initialPage={1} prerenderingSiblingsNumber={0}>
        <div className="home-item">
          <PageList httpParams={{ opt: 'free' }} />
        </div>
        <div className="home-item">
          <PageList httpParams={{ opt: 'vip' }} />
        </div>
        <div className="home-item">
          <PageList httpParams={{ opt: 'newest' }} />
        </div>
        <div className="home-item">
          <PageList httpParams={{ opt: 'recommend' }} />
        </div>
      </Tabs>
    </>
  );
}
