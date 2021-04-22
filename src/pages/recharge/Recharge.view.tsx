import React, { useEffect, useState } from 'react';
import { Toast, Tabs, NavBar, Icon } from 'antd-mobile';
import Http from '@/module/http/Http';
import SystemConfig, { vipMap, rechargeTypeMap } from '@/module/systemConfig/SystemConfig';
import PageHistory from '@/router/PageHistory';
import './Recharge.style.less';

// 充值页面
export default function Recharge() {
  const [rechargeList, setRechargeList] = useState([]);
  const [activedIndex, setActivedIndex] = useState<number>(0);
  const [payIng, setPayIng] = useState(false);
  const [payHtml, setPayHtml] = useState<string>('');
  const requestConfig = () => {
    Toast.loading('加载中...');
    Http.of()
      ?.post(SystemConfig.getUpgrade, {})
      .then((data: any) => {
        Toast.hide()
        setRechargeList(data.data.data.detail);
      });
  };

  const actived = (item: any, index: number) => {
    setActivedIndex(index);
  };

  const pay = () => {
    let currentVal: any = rechargeList[activedIndex];
    if (currentVal) {
      Toast.loading('加载中...');
      Http.of()
        ?.post(SystemConfig.orderTransaction, { vipGradeId: currentVal.id, channel: 'alipay' })
        .then((data: any) => {
          if (data.data.data.content) {
            setPayIng(true);
            setPayHtml(data.data.data.content);
            Toast.loading('正在跳转到支付页面');
            setTimeout(() => {
              if (document.forms && document.forms[0]) {
                document.forms[0].submit();
              }
            }, 1000);
          }
        })
        .catch(() => {
          setPayIng(false);
        });
    }
  };

  useEffect(() => {
    requestConfig();
  }, []);

  return (
    <div className="recharge">
      {!payIng && (
        <>
          <NavBar icon={<Icon type="left" />} onLeftClick={() => PageHistory.goBack()}>
            会员充值
          </NavBar>
          <div className="recharge-list">
            {rechargeList.map((item: any, index: number) => {
              return (
                <div
                  key={item.id}
                  className={activedIndex === index ? 'recharge-list-item actived-line' : 'recharge-list-item'}
                  onClick={() => actived(item, index)}>
                  <span className="recharge-list-item--title">
                    {vipMap[item.vipGrade]}/{rechargeTypeMap[item.type]}
                  </span>
                  <span className="recharge-list-item--val">赠送{item.integral || 0}积分</span>
                  <div
                    className={
                      activedIndex === index ? 'recharge-list-item--money actived-money' : 'recharge-list-item--money'
                    }>
                    ¥ {item.vipPrice || 0}
                  </div>
                  <div className="recharge-list-item--discount">{item.discount === 1 ? '' : item.discount + '折'}</div>
                </div>
              );
            })}
          </div>
          <h3 className="recharge-title">支付方式</h3>
          <div className="recharge-pay">
            <div className="recharge-zfb" onClick={() => pay()}>
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
        </>
      )}
      {payIng && <div dangerouslySetInnerHTML={{ __html: payHtml }}></div>}
    </div>
  );
}
