import React, { useEffect, useState } from 'react';
import { Toast, Tabs, NavBar, Icon } from 'antd-mobile';
import Http from '@/module/http/Http';
import SystemConfig, { vipMap, rechargeTypeMap } from '@/module/systemConfig/SystemConfig';
import PageHistory from '@/router/PageHistory';
import './Recharge.style.less';

// 充值页面
export default function Recharge() {
  const [rechargeList, setRechargeList] = useState([]);
  const requestConfig = () => {
    Http.of()
      ?.post(SystemConfig.getUpgrade, {})
      .then((data: any) => {
        setRechargeList(data.data.data.detail);
      });
  };

  useEffect(() => {
    requestConfig();
  }, []);

  return (
    <div className="recharge">
      <NavBar icon={<Icon type="left" />} onLeftClick={() => PageHistory.goBack()}>
        会员充值
      </NavBar>
      <div className="recharge-list">
        {rechargeList.map((item: any) => {
          return (
            <div key={item.id} className="recharge-list-item">
              <span className="recharge-list-item--title">
                {vipMap[item.vipGrade]}/{rechargeTypeMap[item.type]}
              </span>
              <span className="recharge-list-item--val">赠送{item.integral || 0}积分</span>
              <div className="recharge-list-item--money">¥ {item.vipPrice || 0}</div>
              <div className="recharge-list-item--discount">{item.discount === 1 ? '' : item.discount + '折'}</div>
            </div>
          );
        })}
      </div>
      <h3 className="recharge-title">支付方式</h3>
      <div className="recharge-pay">
        <div className="recharge-zfb">
          <i className="iconfont icon-zhifubao" style={{ fontSize: '30px', color: '#fff' }} />
          <span className="text">支付宝支付</span>
        </div>
      </div>
      <h3 className="recharge-title">其他说明</h3>
      <div className="recharge-info">
        <p>1、累计充值低于268元时，默认是VIP1等级。</p>
        <p>2、累计充值达到268元时，自动更新等级至VIP2。</p>
        <p>3、累计充值达到498元时，自动更新等级至VIP3。</p>
      </div>
    </div>
  );
}
