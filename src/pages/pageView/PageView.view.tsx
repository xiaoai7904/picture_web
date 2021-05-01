import React from 'react';
import { observer } from 'mobx-react';
// import {observer, useLocalObservable} from 'mobx-react-lite'
import { TabBar } from 'antd-mobile';
import { useGlobalStore } from '@/store/StoreContext';
import HomeView from '@/pages/home/Home.view';
import TagView from '@/pages/tag/Tag.view';
import Vip from '@/pages/vip/Vip.view';
import My from '@/pages/my/My.view';

import './PageView.style.less';

export default observer(() => {
  const { globalStore } = useGlobalStore();
  // const PageViewState = useLocalObservable(() => {
  //   return {
  //     selectedTab: globalStore.selectedTab
  //   }
  // })
  // console.log('pageViewRender.....')

  return (
    <div className="page-view">
      <TabBar prerenderingSiblingsNumber={0} unselectedTintColor="#9e9e9e" tintColor="#c4937e" barTintColor="white">
        <TabBar.Item
          title="首页"
          key="Life"
          icon={<i className="iconfont icon-shouye" style={{ fontSize: '22px' }} />}
          selectedIcon={<i className="iconfont icon-shouye" style={{ fontSize: '22px', color: '#c4937e' }} />}
          selected={globalStore.selectedTab === 'home'}
          onPress={() => {
            globalStore.setSelectedTab('home');
          }}
          data-seed="logId">
          <HomeView />
        </TabBar.Item>
        <TabBar.Item
          icon={<i className="iconfont icon-fenlei" style={{ fontSize: '22px' }} />}
          selectedIcon={<i className="iconfont icon-fenlei" style={{ fontSize: '22px', color: '#c4937e' }} />}
          title="分类"
          key="Koubei"
          selected={globalStore.selectedTab === 'tag'}
          onPress={() => {
            globalStore.setSelectedTab('tag');
          }}
          data-seed="logId1">
          <TagView />
        </TabBar.Item>
        <TabBar.Item
          icon={<i className="iconfont icon-VIP" style={{ fontSize: '22px' }} />}
          selectedIcon={<i className="iconfont icon-VIP" style={{ fontSize: '22px', color: '#c4937e' }} />}
          title="VIP说明"
          key="Friend"
          selected={globalStore.selectedTab === 'vip'}
          onPress={() => {
            globalStore.setSelectedTab('vip');
          }}>
          <Vip />
        </TabBar.Item>
        <TabBar.Item
          icon={<i className="iconfont icon-wode" style={{ fontSize: '22px' }} />}
          selectedIcon={<i className="iconfont icon-wode" style={{ fontSize: '22px', color: '#c4937e' }} />}
          title="我的"
          key="my"
          selected={globalStore.selectedTab === 'my'}
          onPress={() => {
            globalStore.setSelectedTab('my');
          }}>
          <My />
        </TabBar.Item>
      </TabBar>
    </div>
  );
});
