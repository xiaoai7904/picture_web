import React from 'react';
import { List, InputItem, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import Http from '@/module/http/Http';
import SystemConfig from '@/module/systemConfig/SystemConfig';
import Utils from '@/module/utils/Utils';
import './Login.style.less';

interface props {
  form?: any;
}
interface stateType {
  showPassword: boolean;
  isForgot: boolean;
  isSendCode: boolean;
  updatePassword: boolean;
  isRegister: boolean;
  time: number;
}
interface loginParams {
  loginName: string;
  password: string;
  //   areaCode: string
}
interface registerParams {
  loginName: string;
  areaCode: string;
  password: string;
  code: string;
  phone: string;
}
type codeType = 'register' | 'resetpwd' | 'setpwd';
interface validCodeParams {
  codeType: codeType;
  phone: string;
  areaCode: string;
  code: string;
}
class BasicInputExample extends React.Component<props, stateType> {
  inputRef: any;
  labelFocusInst: any;
  state: stateType = {
    showPassword: false,
    isForgot: false,
    isSendCode: false,
    updatePassword: false,
    isRegister: false,
    time: 60,
  };
  componentDidMount() {}
  handleClick = () => {
    this.inputRef.focus();
  };
  forgotPassword() {
    this.setState({ isForgot: true });
  }
  confirm() {
    this.setState({ updatePassword: true });
  }
  sendCode() {
    this.setState({ isSendCode: true });
    let oldTime = this.state.time;
    let timer = setInterval(() => {
      oldTime--;
      if (oldTime < 0) {
        oldTime = 60;
        clearInterval(timer);
        this.setState({ isSendCode: false });
      }
      this.setState({ time: oldTime });
    }, 1000);
  }
  updatePasswordFn() {
    this.setState({ isForgot: false, updatePassword: false, isSendCode: false });
  }
  register() {
    this.setState({ isRegister: true });
  }
  registerFn() {
    const validCode = (params: validCodeParams) => {
      return new Promise(resolve =>
        Http.of()
          ?.post(SystemConfig.validCode, params)
          .then((data: any) => {
            console.log(data);
          })
      );
    };

    const register = (params: registerParams) => {
      Http.of()
        ?.post(SystemConfig.register, params)
        .then((data: any) => {
          console.log(data);
        });
    };

    this.props.form.validateFields((error: any, value: any) => {
      console.log(error, value);
      if (!error) {
        let params: registerParams = {
          loginName: value.registerUserName,
          password: Utils.md5(value.registerPassword),
          code: value.registerCode,
          areaCode: '+86',
          phone: value.registerPhone,
        };
        validCode({
          codeType: 'register',
          phone: value.registerPhone,
          areaCode: '+86',
          code: value.registerCode,
        }).then(() => {
          register(params);
        });
      }
    });
  }
  login() {
    this.props.form.validateFields((error: any, value: any) => {
      console.log(error, value);
      if (!error) {
        let params: loginParams = {
          loginName: value.loginPhone,
          password: Utils.md5(value.loginPassword),
        };

        Http.of()
          ?.post(SystemConfig.login, params)
          .then((data: any) => {
            console.log(data);
          });
      }
    });
  }
  passwordShow2hidden() {
    if (this.state.showPassword) {
      return (
        <i
          className="iconfont icon-yanjing"
          style={{ fontSize: '20px', color: '#888888' }}
          onClick={() => this.setState({ showPassword: false })}
        />
      );
    }
    return (
      <i
        className="iconfont icon-biyan"
        style={{ fontSize: '20px', color: '#888888' }}
        onClick={() => this.setState({ showPassword: true })}
      />
    );
  }
  verificationCode() {
    if (this.state.isSendCode) {
      return <span>{this.state.time}秒</span>;
    }
    return (
      <span className="send-code" onClick={() => this.sendCode()}>
        发送验证码
      </span>
    );
  }
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className="login">
        <h1 className="login-title">HaiHai</h1>
        {!this.state.isForgot && !this.state.isRegister && !this.state.updatePassword && (
          <div>
            <List className="login-phone">
              <InputItem
                {...getFieldProps('loginPhone', { rules: [{ required: true }] })}
                placeholder="请输入手机号"
                labelNumber={2}>
                <i className="iconfont icon-wode" style={{ fontSize: '22px', color: '#888888' }} />
              </InputItem>
            </List>

            <List>
              <InputItem
                {...getFieldProps('loginPassword', { rules: [{ required: true }] })}
                type={this.state.showPassword ? 'text' : 'password'}
                placeholder="请输入密码"
                extra={this.passwordShow2hidden()}
                labelNumber={2}>
                <i className="iconfont icon-mima" style={{ fontSize: '22px', color: '#888888' }} />
              </InputItem>
            </List>
            <div className="login-forgot">
              <span className="send-code" onClick={() => this.register()}>
                注册新账号
              </span>
              <span onClick={() => this.forgotPassword()}>忘记密码</span>
            </div>
            <div className="login-submit-btn">
              <Button type="primary" onClick={() => this.login()}>
                登 录
              </Button>
            </div>
          </div>
        )}

        {this.state.isForgot && !this.state.updatePassword && !this.state.isRegister && (
          <div>
            <List className="login-phone">
              <InputItem
                {...getFieldProps('forgotPhone', { rules: [{ required: true }] })}
                placeholder="请输入手机号"
                labelNumber={2}>
                <i className="iconfont icon-phone" style={{ fontSize: '22px', color: '#888888' }} />
              </InputItem>
            </List>

            <List className="login-code">
              <InputItem
                {...getFieldProps('forgotCode', { rules: [{ required: true }] })}
                placeholder="请输入验证码"
                labelNumber={2}
                extra={this.verificationCode()}>
                <i className="iconfont icon-mima" style={{ fontSize: '22px', color: '#888888' }} />
              </InputItem>
            </List>

            <div className="login-submit-btn">
              <Button type="primary" onClick={() => this.confirm()}>
                确 定
              </Button>
            </div>
          </div>
        )}

        {this.state.updatePassword && !this.state.isForgot && !this.state.isRegister && (
          <div>
            <List className="login-phone">
              <InputItem
                {...getFieldProps('newPassword', { rules: [{ required: true }] })}
                type="password"
                placeholder="请输入新密码"
                labelNumber={2}>
                <i className="iconfont icon-mima" style={{ fontSize: '22px', color: '#888888' }} />
              </InputItem>
            </List>

            <List className="login-password">
              <InputItem
                {...getFieldProps('newPassword1', { rules: [{ required: true }] })}
                type="password"
                placeholder="请输入新密码"
                labelNumber={2}>
                <i className="iconfont icon-mima" style={{ fontSize: '22px', color: '#888888' }} />
              </InputItem>
            </List>

            <div className="login-submit-btn">
              <Button type="primary" onClick={() => this.updatePasswordFn()}>
                确 定
              </Button>
            </div>
          </div>
        )}

        {this.state.isRegister && !this.state.updatePassword && !this.state.isForgot && (
          <div>
            <List className="login-phone">
              <InputItem
                {...getFieldProps('registerUserName', { rules: [{ required: true }] })}
                placeholder="请输入用户名"
                labelNumber={2}>
                <i className="iconfont icon-wode" style={{ fontSize: '22px', color: '#888888' }} />
              </InputItem>
            </List>

            <List className="login-phone">
              <InputItem
                {...getFieldProps('registerPhone', { rules: [{ required: true }] })}
                placeholder="请输入手机号"
                labelNumber={2}>
                <i className="iconfont icon-phone" style={{ fontSize: '22px', color: '#888888' }} />
              </InputItem>
            </List>

            <List className="login-phone">
              <InputItem
                {...getFieldProps('registerCode', { rules: [{ required: true }] })}
                placeholder="请输入验证码"
                labelNumber={2}
                extra={this.verificationCode()}>
                <i className="iconfont icon-mima" style={{ fontSize: '22px', color: '#888888' }} />
              </InputItem>
            </List>

            <List>
              <InputItem
                {...getFieldProps('registerPassword', { rules: [{ required: true }] })}
                type={'password'}
                placeholder="请输入密码"
                labelNumber={2}>
                <i className="iconfont icon-mima" style={{ fontSize: '22px', color: '#888888' }} />
              </InputItem>
            </List>

            <div className="login-back">
              <span onClick={() => this.setState({ isRegister: false })}>返回登录</span>
            </div>

            <div className="login-submit-btn">
              <Button type="primary" onClick={() => this.registerFn()}>
                注 册
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default createForm()(BasicInputExample);
