import React, { useEffect, useState } from 'react';
import { List, NavBar, Modal, Toast, Button, WhiteSpace } from 'antd-mobile';
import { observer } from 'mobx-react';
import PageHistory from '@/router/PageHistory';
import { useGlobalStore } from '@/store/StoreContext';
import Http from '@/module/http/Http';
import SystemConfig, { vipMap } from '@/module/systemConfig/SystemConfig';
import Utils from '@/module/utils/Utils';

import './My.style.less';
const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;
const prompt = Modal.prompt;

const userIcon = require('@/assets/images/nologin.png');

export default observer(() => {
  let { globalStore } = useGlobalStore();
  let token = localStorage.getItem('token');
  const [isLogin] = useState(token ? true : false);
  const userinfo = globalStore.userInfo;

  const getUserInfo = () => {
    Http.of()
      ?.post(SystemConfig.getUserInfo, {})
      .then((data: any) => {
        globalStore.setUserInfo(data.data.data.userinfo);
      });
  };

  const tips = () => {
    alert('提示', '您未登录，是否马上登录？', [
      { text: '取消', onPress: () => {}, style: 'default' },
      {
        text: '确定',
        onPress: () => {
          PageHistory.push(`/login`);
        },
      },
    ]);
  };
  const gotoLoginPage = () => {
    !isLogin && PageHistory.push(`/login`);
  };

  const gotoMyLikePage = () => {
    if (isLogin) {
      PageHistory.push('/myLike');
    } else {
      tips();
    }
  };

  const gotoRechargePage = () => {
    if (isLogin) {
      PageHistory.push('/recharge');
    } else {
      tips();
    }
  };

  const setting = () => {
    if (isLogin) {
      PageHistory.push('/setting');
    } else {
      tips();
    }
  };

  const gotoCommentPage = () => {
    PageHistory.push('/comment');
  };

  const gotoCustomerServicePage = () => {
    PageHistory.push('/customerService');
  };

  const gotoSubScriptPage = () => {
    if (isLogin) {
      PageHistory.push('/subscript');
    } else {
      tips();
    }
  };

  const exchange = () => {
    if (isLogin) {
      prompt('兑换码', '请输入兑换码', [
        { text: '取消' },
        {
          text: '兑换',
          onPress: code => {
            Toast.loading('兑换中...');
            Http.of()
              ?.post(SystemConfig.exchangeChange, { code })
              .then((data: any) => {
                Toast.success('兑换成功');
                getUserInfo();
              });
          },
        },
      ]);
    } else {
      tips();
    }
  };

  return (
    <div className="my">
      <div className="my-header">
        <h1>我的</h1>
        <div className="my-header-message">
          <img src={userIcon} alt="用户" width="60" height="60" className="my-header-usericon" />
          <div className="my-header-username">
            {!isLogin && (
              <span className="my-text" onClick={gotoLoginPage}>
                未登录，点击登录
              </span>
            )}
            {isLogin && <span className="name">hi,</span>}
            {isLogin && <span className="name">{userinfo.userName}</span>}
          </div>
        </div>
      </div>
      <div className="my-info">
        <div className="my-info-item">
          <span className="val">{isLogin ? vipMap[userinfo.vipGrade] : '--'}</span>
          <span className="title">会员等级</span>
        </div>
        <div className="my-info-item my-info-center">
          <span className="val">
            {isLogin ? (userinfo.remaining <= 0 ? '会员已过期' : `${userinfo.remaining}天`) : '--'}
          </span>
          <span className="title">有效期</span>
        </div>
        <div className="my-info-item">
          <span className="val">{isLogin ? userinfo.amount : '--'}</span>
          <span className="title">余额</span>
        </div>
      </div>
      <List>
        <Item
          arrow="horizontal"
          thumb={<i className="iconfont icon-star" style={{ fontSize: '24px', color: '#555' }} />}
          multipleLine
          onClick={() => gotoMyLikePage()}>
          我喜欢的
        </Item>
        <Item
          arrow="horizontal"
          thumb={<i className="iconfont icon-dingyue" style={{ fontSize: '24px', color: '#555' }} />}
          multipleLine
          onClick={() => gotoSubScriptPage()}>
          我订阅的
        </Item>
        {/* <Item
          arrow="horizontal"
          thumb={<i className="iconfont icon-pinglun" style={{ fontSize: '24px', color: '#555' }} />}
          multipleLine
          onClick={() => gotoCommentPage()}>
          我的评论
        </Item> */}
        <Item
          thumb={<i className="iconfont icon-chongzhi" style={{ fontSize: '22px', color: '#555' }} />}
          arrow="horizontal"
          onClick={() => gotoRechargePage()}>
          充值
        </Item>
        <Item
          thumb={<i className="iconfont icon-duihuan" style={{ fontSize: '22px', color: '#555' }} />}
          arrow="horizontal"
          onClick={() => exchange()}>
          兑换码
        </Item>
        <Item
          thumb={<i className="iconfont icon-kefu" style={{ fontSize: '22px', color: '#555' }} />}
          arrow="horizontal"
          onClick={() => gotoCustomerServicePage()}>
          联系客服
        </Item>
        <WhiteSpace />
        <Item
          thumb={<i className="iconfont icon-shezhi" style={{ fontSize: '22px', color: '#555' }} />}
          arrow="horizontal"
          onClick={() => setting()}>
          设置
        </Item>
      </List>
    </div>
  );
});
