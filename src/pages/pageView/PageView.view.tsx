import React, { useState } from 'react';
import { Switch, Route, Router, Redirect, HashRouter } from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import HomeView from '@/pages/home/Home.view';
import TagView from '@/pages/tag/Tag.view';
import Vip from '@/pages/vip/Vip.view';
import My from '@/pages/my/My.view';

import './PageView.style.less';

export default function PageView() {
  const [selectedTab, setSelectedTab] = useState('home');
  return (
    <div className="page-view">
      <TabBar unselectedTintColor="#949494" tintColor="#33A3F4" barTintColor="white">
        <TabBar.Item
          title="首页"
          key="Life"
          icon={<i className="iconfont icon-shouye" style={{ fontSize: '22px' }} />}
          selectedIcon={<i className="iconfont icon-shouye" style={{ fontSize: '22px', color: '#108ee9' }} />}
          selected={selectedTab === 'home'}
          onPress={() => {
            setSelectedTab('home');
          }}
          data-seed="logId">
          <HomeView />
        </TabBar.Item>
        <TabBar.Item
          icon={<i className="iconfont icon-fenlei" style={{ fontSize: '22px' }} />}
          selectedIcon={<i className="iconfont icon-fenlei" style={{ fontSize: '22px', color: '#108ee9' }} />}
          title="分类"
          key="Koubei"
          selected={selectedTab === 'tag'}
          onPress={() => {
            setSelectedTab('tag');
          }}
          data-seed="logId1">
          <TagView />
        </TabBar.Item>
        <TabBar.Item
          icon={<i className="iconfont icon-VIP" style={{ fontSize: '22px' }} />}
          selectedIcon={<i className="iconfont icon-VIP" style={{ fontSize: '22px', color: '#108ee9' }} />}
          title="VIP说明"
          key="Friend"
          selected={selectedTab === 'vip'}
          onPress={() => {
            setSelectedTab('vip');
          }}>
          <Vip />
        </TabBar.Item>
        <TabBar.Item
          icon={<i className="iconfont icon-wode" style={{ fontSize: '22px' }} />}
          selectedIcon={<i className="iconfont icon-wode" style={{ fontSize: '22px', color: '#108ee9' }} />}
          title="我的"
          key="my"
          selected={selectedTab === 'my'}
          onPress={() => {
            setSelectedTab('my');
          }}>
          <My />
        </TabBar.Item>
      </TabBar>
    </div>
  );
}
