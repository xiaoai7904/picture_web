import React, { useEffect, useState } from 'react';
import { List, NavBar, Modal, Toast, WhiteSpace } from 'antd-mobile';
import PageHistory from '@/router/PageHistory';
import { useGlobalStore } from '@/store/StoreContext';
import Http from '@/module/http/Http';
import SystemConfig, { vipMap } from '@/module/systemConfig/SystemConfig';
import Utils from '@/module/utils/Utils';
import './My.style.less';
const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;

export default function My() {
  let { globalStore } = useGlobalStore();
  let token = localStorage.getItem('token');
  const [isLogin] = useState(token ? true : false);
  const userinfo = globalStore.userInfo;

  const showAlert = () => {
    alert('提示', '您确定要退出登录吗？', [
      { text: '取消', onPress: () => {}, style: 'default' },
      {
        text: '确定',
        onPress: () => {
          httpLogout();
        },
      },
    ]);
  };

  const httpLogout = () => {
    Http.of()
      ?.post(SystemConfig.logout, {})
      .then(() => {
        globalStore.setUserInfo();
        Toast.success('退出成功');
        PageHistory.replace('/login');
      });
  };

  const gotoLoginPage = () => {
    !isLogin && PageHistory.push(`/login`);
  };

  const gotoSetPwdPage = () => {
    isLogin && PageHistory.push('/setPwd');
  };

  const logout = () => {
    showAlert();
  };

  return (
    <div className="my">
      <NavBar onLeftClick={() => console.log('onLeftClick')}>会员中心</NavBar>
      <List>
        <Item
          arrow="horizontal"
          thumb={<i className="iconfont icon-wode" style={{ fontSize: '24px', color: '#888' }} />}
          multipleLine
          onClick={() => gotoLoginPage()}>
          {isLogin && (
            <>
              {userinfo.userName}{' '}
              <i
                className={`iconfont ${userinfo.vipGrade !== 0 ? 'icon-VIP' : ''}`}
                style={{ fontSize: '24px', color: '#f34747' }}
              />
              <Brief>{userinfo.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}</Brief>
              <Brief>{vipMap[userinfo.vipGrade]}</Brief>
            </>
          )}
          {!isLogin && <span className="my-text">未登录，点击登录</span>}
        </Item>
        <Item
          arrow="horizontal"
          thumb={<i className="iconfont icon-xin" style={{ fontSize: '24px', color: '#888' }} />}
          multipleLine
          onClick={() => gotoLoginPage()}>
          我喜欢的
        </Item>
        <Item
          arrow="horizontal"
          thumb={<i className="iconfont icon-dingyue" style={{ fontSize: '24px', color: '#888' }} />}
          multipleLine
          onClick={() => gotoLoginPage()}>
          我订阅的
        </Item>
        <Item
          thumb={<i className="iconfont icon-chongzhi" style={{ fontSize: '22px', color: '#888' }} />}
          arrow="horizontal"
          onClick={() => gotoLoginPage()}>
          充值
        </Item>
        <Item
          thumb={<i className="iconfont icon-zhongzhimima" style={{ fontSize: '22px', color: '#888' }} />}
          arrow="horizontal"
          onClick={() => gotoSetPwdPage()}>
          设置密码
        </Item>
        {/* <Item
          thumb={<i className="iconfont icon-fankui" style={{ fontSize: '22px', color: '#888' }} />}
          arrow="horizontal"
          onClick={() => gotoLoginPage()}>
          问题反馈
        </Item> */}
        <Item
          thumb={<i className="iconfont icon-dengchu" style={{ fontSize: '22px', color: '#888' }} />}
          arrow="horizontal"
          onClick={() => logout()}>
          退出登录
        </Item>
      </List>
    </div>
  );
}
