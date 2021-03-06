import React, { useState } from 'react';
import { Tabs, NavBar, Icon } from 'antd-mobile';
import PageList from '@/components/pageList/PageList.view';
import { useGlobalStore } from '@/store/StoreContext';
import Http from '@/module/http/Http';
import SystemConfig from '@/module/systemConfig/SystemConfig';
import PageHistory from '@/router/PageHistory';
import './Home.style.less';

export default function HomeView() {
  const tabs = [
    { title: '免费体验' },
    { title: 'VIP畅享' },
    { title: '最新' },
    { title: '推荐' },
    {
      title: (
        <Icon
          key="0"
          type="search"
          onClick={() => {
            globalStore.setSelectedTab('tag');
            // setPage(1);
          }}
        />
      ),
    },
  ];
  const { globalStore } = useGlobalStore();
  const [page, setPage] = useState(1);

  return (
    <>
      {/* <NavBar
        mode="dark"
        leftContent="HaiHai"
        rightContent={[<Icon key="0" type="search" onClick={() => globalStore.setSelectedTab('tag')} />]}
      /> */}
      <Tabs
        tabs={tabs}
        initialPage={1}
        prerenderingSiblingsNumber={0}
        page={page}
        swipeable={false}
        onTabClick={(tab, index) => {
          index !== 4 && setPage(index);
        }}>
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
        {/* <Icon key="0" type="search" onClick={() => globalStore.setSelectedTab('tag')} /> */}
      </Tabs>
    </>
  );
}
