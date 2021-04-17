import React, { useState } from 'react';
import { List, InputItem, Button, Toast, NavBar, Icon } from 'antd-mobile';
import { createForm } from 'rc-form';
import Http from '@/module/http/Http';
import SystemConfig from '@/module/systemConfig/SystemConfig';
import Utils from '@/module/utils/Utils';
import { useGlobalStore } from '@/store/StoreContext';
import PageHistory from '@/router/PageHistory';

import './SetPassword.style.less';

interface setPasswordParams {
  phone: string;
  areaCode: string;
  oldPassword: string;
  password: string;
}

function SetPassword(props: any) {
  const { getFieldProps } = props.form;
  const { globalStore } = useGlobalStore();
  const [btnLoading, setBtnLoading] = useState(false);

  const updatePasswordFn = () => {
    setBtnLoading(true);
    props.form.validateFields((error: any, value: any) => {
      if (!error) {
        let params: setPasswordParams = {
          phone: globalStore.userInfo.phone,
          areaCode: '+86',
          oldPassword: Utils.md5(value.oldPassword),
          password: Utils.md5(value.newPassword),
        };
        Http.of()
          ?.post(SystemConfig.setPassword, params)
          .then((data: any) => {
            setBtnLoading(false);
            Toast.success('密码重置成功');
            PageHistory.goBack();
          })
          .catch(() => {
            setBtnLoading(false);
          });
      } else {
        setBtnLoading(false);
      }
    });
  };

  return (
    <div className="set-password">
      <NavBar icon={<Icon type="left" />} onLeftClick={() => PageHistory.goBack()}>
        重置密码
      </NavBar>
      <div className="set-password-content">
        <List className="set-password-pwd">
          <InputItem
            {...getFieldProps('oldPassword', { rules: [{ required: true }] })}
            type="password"
            placeholder="请输入原密码"
            labelNumber={2}>
            <i className="iconfont icon-mima" style={{ fontSize: '22px', color: '#888888' }} />
          </InputItem>
        </List>

        <List className="login-password">
          <InputItem
            {...getFieldProps('newPassword', { rules: [{ required: true }] })}
            type="password"
            placeholder="请输入新密码"
            labelNumber={2}>
            <i className="iconfont icon-mima" style={{ fontSize: '22px', color: '#888888' }} />
          </InputItem>
        </List>

        <div className="login-submit-btn">
          <Button loading={btnLoading} type="primary" onClick={() => updatePasswordFn()}>
            确 定
          </Button>
        </div>
      </div>
    </div>
  );
}

export default createForm()(SetPassword);
