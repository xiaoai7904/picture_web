import React, { useState } from 'react';
import { Switch, Route, Router, Redirect, HashRouter } from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import HomeView from '@/pages/home/Home.view';
import TagView from '@/pages/tag/Tag.view';

import './PageView.style.less';

export default function PageView() {
  const [selectedTab, setSelectedTab] = useState('home');
  return (
    <div className="page-view">
      <TabBar unselectedTintColor="#949494" tintColor="#33A3F4" barTintColor="white">
        <TabBar.Item
          title="首页"
          key="Life"
          icon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background:
                  'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat',
              }}
            />
          }
          selectedIcon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background:
                  'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat',
              }}
            />
          }
          selected={selectedTab === 'home'}
          onPress={() => {
            setSelectedTab('home');
          }}
          data-seed="logId">
          <HomeView />
        </TabBar.Item>
        <TabBar.Item
          icon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background:
                  'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat',
              }}
            />
          }
          selectedIcon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background:
                  'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat',
              }}
            />
          }
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
          icon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background:
                  'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat',
              }}
            />
          }
          selectedIcon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background:
                  'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat',
              }}
            />
          }
          title="VIP说明"
          key="Friend"
          selected={selectedTab === 'vip'}
          onPress={() => {
            setSelectedTab('vip');
          }}>
          <div>vip</div>
        </TabBar.Item>
        <TabBar.Item
          icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
          selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
          title="我的"
          key="my"
          selected={selectedTab === 'my'}
          onPress={() => {
            setSelectedTab('my');
          }}>
          <div>my</div>
        </TabBar.Item>
      </TabBar>
    </div>
  );
}
