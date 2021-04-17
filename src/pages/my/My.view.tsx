import React, { useEffect, useState } from 'react';
import { List, NavBar } from 'antd-mobile';
import PageHistory from '@/router/PageHistory';
import './My.style.less';
const Item = List.Item;
const Brief = Item.Brief;

export default function My() {
  let val = localStorage.getItem('isLogin');
  const [isLogin] = useState(val === 'true' ? true : false);

  const gotoLoginPage = () => {
    PageHistory.push(`/login`);
  };

  return (
    <div>
      <NavBar onLeftClick={() => console.log('onLeftClick')}>会员中心</NavBar>

      <List renderHeader={() => {}}>
        <Item
          arrow="horizontal"
          thumb={<i className="iconfont icon-wode" style={{ fontSize: '24px', color: '#888' }} />}
          multipleLine
          onClick={() => gotoLoginPage()}>
          {isLogin && (
            <>
              xiaoai <Brief>185****1991</Brief>
              <Brief>会员 29后到期</Brief>
            </>
          )}
          {!isLogin && <span className="my-text">未登录，点击登录</span>}
        </Item>
        <Item
          thumb={<i className="iconfont icon-chongzhi" style={{ fontSize: '22px', color: '#888' }} />}
          arrow="horizontal"
          onClick={() => isLogin ? '' : gotoLoginPage()}>
          充值
        </Item>
        <Item
          thumb={<i className="iconfont icon-zhongzhimima" style={{ fontSize: '22px', color: '#888' }} />}
          arrow="horizontal"
          onClick={() => isLogin ? '' : gotoLoginPage()}>
          设置密码
        </Item>
        <Item
          thumb={<i className="iconfont icon-fankui" style={{ fontSize: '22px', color: '#888' }} />}
          arrow="horizontal"
          onClick={() => isLogin ? '' : gotoLoginPage()}>
          问题反馈
        </Item>
      </List>
    </div>
  );
}
