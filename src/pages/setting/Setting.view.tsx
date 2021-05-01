import React from 'react';
import { List, NavBar, Modal, Toast, Button, Icon } from 'antd-mobile';
import PageHistory from '@/router/PageHistory';
import Http from '@/module/http/Http';
import SystemConfig, { vipMap } from '@/module/systemConfig/SystemConfig';
import Utils from '@/module/utils/Utils';
import { useGlobalStore } from '@/store/StoreContext';

import './Setting.style.less';

const Item = List.Item;
const alert = Modal.alert;

export default function Setting() {
  let { globalStore } = useGlobalStore();

  const gotoSetPwdPage = () => {
    PageHistory.push('/setPwd');
  };

  const gotoHelpPage = () => {
    PageHistory.push('/help');
  };

  const gotoPrivacy = () => {
    PageHistory.push('/privacy');
  };
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
        // Toast.success('退出成功');
        PageHistory.replace('/login');
      });
  };

  const logout = () => {
    showAlert();
  };

  return (
    <div className="setting">
      <NavBar mode="light" icon={<Icon type="left" color="#8a8a8a" />} onLeftClick={() => PageHistory.goBack()}>
        设置
      </NavBar>
      <List>
        <Item arrow="horizontal" multipleLine onClick={() => gotoSetPwdPage()}>
          修改密码
        </Item>
        <Item arrow="horizontal" multipleLine onClick={() => gotoHelpPage()}>
          关于我们
        </Item>
        {/* <Item arrow="horizontal" multipleLine onClick={() => {}}>
          帮助说明
        </Item> */}
        <Item arrow="horizontal" onClick={() => gotoPrivacy()}>
          隐私政策
        </Item>
      </List>
      <Button onClick={logout}>退出登录</Button>
    </div>
  );
}
