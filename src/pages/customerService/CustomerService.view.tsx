import React, { useEffect, useState } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import PageHistory from '@/router/PageHistory';
import Http from '@/module/http/Http';
import SystemConfig from '@/module/systemConfig/SystemConfig';

/**
 *
 * 客服
 */
export default function CustomerService() {
  const [customerList, setCustomerList] = useState([]);
  const getCustomerService = () => {
    Http.of()
      ?.post(SystemConfig.configCustomer, {})
      .then((data: any) => {
        console.log(data);
        setCustomerList(data.data.data.detail);
      });
  };

  useEffect(() => {
    getCustomerService();
  }, []);
  return (
    <div className="customer-service">
      <NavBar mode="light" icon={<Icon type="left" color="#8a8a8a" />} onLeftClick={() => PageHistory.goBack()}>
        客服
      </NavBar>
      <div className="customer-service-content" style={{padding: "10px 15px"}}>
        {customerList.map((item: any) => {
          if (item.status === 1) {
            return (
              <div>
                <h3>{item.name}</h3>
                <p>
                  联系方式：<span>{item.code}</span>
                </p>
                <img src={item.qrCode} alt="二维码" height="200" width="200"/>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
