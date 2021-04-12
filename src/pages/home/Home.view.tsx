import React from 'react';
import { Tabs, NavBar, Icon } from 'antd-mobile';
import PageList from '@/components/pageList/PageList.view';
import './Home.style.less';

export default function HomeView() {
  const tabs = [{ title: '免费体验' }, { title: 'VIP畅享' }, { title: '最新' }, { title: '推荐' }];
  return (
    <>
      <NavBar
        mode="dark"
        leftContent="HaiHai"
        rightContent={[<Icon key="0" type="search" style={{ marginRight: '16px' }} />]}
      />
      <Tabs tabs={tabs} initialPage={0}>
        <div className="home-item">
          <PageList index={1}/>
        </div>
        <div className="home-item">
          <PageList index={2}/>
        </div>
        <div className="home-item">
          <PageList index={3}/>
        </div>
        <div className="home-item">
          <PageList index={4}/>
        </div>
      </Tabs>
    </>
  );
}
