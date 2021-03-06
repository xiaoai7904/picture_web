import React from 'react';
import { List, InputItem, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import Http from '@/module/http/Http';
import SystemConfig from '@/module/systemConfig/SystemConfig';
import PageHistory from '@/router/PageHistory';
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
  phone: string;
  btnLoading: boolean;
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

interface forgotPasswordParams {
  password: string;
  areaCode: string;
  phone: string;
}

class Login extends React.Component<props, stateType> {
  inputRef: any;
  labelFocusInst: any;
  state: stateType = {
    showPassword: false,
    isForgot: false,
    isSendCode: false,
    updatePassword: false,
    isRegister: false,
    time: 60,
    phone: '',
    btnLoading: false,
  };
  componentDidMount() {
    localStorage.removeItem('token');
  }
  forgotPassword() {
    this.setState({ isForgot: true });
  }
  confirm() {
    this.setState({ btnLoading: true, time: 60, isSendCode: false }, () => {
      this.props.form.validateFields((error: any, value: any) => {
        if (!error) {
          this.validCode({
            codeType: 'resetpwd',
            phone: value.forgotPhone,
            areaCode: '86',
            code: value.forgotCode,
          })
            .then((data: any) => {
              this.setState({ btnLoading: false, updatePassword: true, isForgot: false, phone: value.forgotPhone });
            })
            .catch(() => {
              this.setState({ btnLoading: false });
            });
        } else {
          this.setState({ btnLoading: false });
        }
      });
    });
  }
  sendCode(name: string, codeType: string) {
    this.props.form.validateFields([name], (error: any, value: any) => {
      if (!error) {
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

        Http.of()
          ?.post(SystemConfig.getCode, { codeType, phone: value[name], areaCode: '86' })
          .then((data: any) => {
            Toast.success('?????????????????????', 1);
          });
      } else {
        this.setState({ btnLoading: false });
      }
    });
  }
  updatePasswordFn() {
    this.setState({ btnLoading: true, time: 60, isSendCode: false }, () => {
      this.props.form.validateFields((error: any, value: any) => {
        if (!error) {
          let params: forgotPasswordParams = {
            password: Utils.md5(value.newPassword),
            areaCode: '86',
            phone: this.state.phone,
          };
          Http.of()
            ?.post(SystemConfig.forgotPassword, params)
            .then((data: any) => {
              Toast.success('??????????????????');
              this.setState({
                btnLoading: false,
                isForgot: false,
                updatePassword: false,
                isSendCode: false,
                phone: '',
              });
            })
            .catch(() => {
              this.setState({ btnLoading: false });
            });
        } else {
          this.setState({ btnLoading: false });
        }
      });
    });
  }
  register() {
    this.setState({ isRegister: true });
  }
  validCode = (params: validCodeParams) => {
    return new Promise(resolve =>
      Http.of()
        ?.post(SystemConfig.validCode, params)
        .then((data: any) => {
          resolve(data);
        })
    );
  };
  registerFn() {
    const register = (params: registerParams) => {
      this.setState({ btnLoading: true, time: 60, isSendCode: false }, () => {
        Http.of()
          ?.post(SystemConfig.register, params)
          .then((data: any) => {
            Toast.success('??????????????????');
            // this.setState({ btnLoading: false, isRegister: false });
            localStorage.setItem('token', data.data.data.user.token);
            PageHistory.replace({ pathname: '/empty' });
          })
          .catch(() => {
            this.setState({ btnLoading: false });
          });
      });
    };

    this.props.form.validateFields((error: any, value: any) => {
      console.log(error, value);
      if (!error) {
        let params: registerParams = {
          loginName: value.registerUserName,
          password: Utils.md5(value.registerPassword),
          code: value.registerCode,
          areaCode: '86',
          phone: value.registerPhone,
        };
        this.validCode({
          codeType: 'register',
          phone: value.registerPhone,
          areaCode: '86',
          code: value.registerCode,
        }).then(() => {
          register(params);
        });
      }
    });
  }
  login() {
    Toast.loading('?????????...', 0);
    this.props.form.validateFields((error: any, value: any) => {
      if (!error) {
        let params: loginParams = {
          loginName: value.loginPhone,
          password: Utils.md5(value.loginPassword),
        };

        Http.of()
          ?.post(SystemConfig.login, params)
          .then((data: any) => {
            Toast.hide();
            localStorage.setItem('token', data.data.data.user.token);
            PageHistory.replace({ pathname: '/empty' });
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
  verificationCode(name: string, codeType: string) {
    if (this.state.isSendCode) {
      return <span>{this.state.time}???</span>;
    }
    return (
      <span className="send-code" onClick={() => this.sendCode(name, codeType)}>
        ???????????????
      </span>
    );
  }
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className="login">
        <h1 className="login-title">???????????????</h1>
        {!this.state.isForgot && !this.state.isRegister && !this.state.updatePassword && (
          <div>
            <List className="login-phone">
              <InputItem
                {...getFieldProps('loginPhone', { rules: [{ required: true }] })}
                placeholder="??????????????????"
                labelNumber={2}>
                <i className="iconfont icon-wode" style={{ fontSize: '22px', color: '#888888' }} />
              </InputItem>
            </List>

            <List>
              <InputItem
                {...getFieldProps('loginPassword', { rules: [{ required: true }] })}
                type={this.state.showPassword ? 'text' : 'password'}
                placeholder="???????????????"
                extra={this.passwordShow2hidden()}
                labelNumber={2}>
                <i className="iconfont icon-mima" style={{ fontSize: '22px', color: '#888888' }} />
              </InputItem>
            </List>
            <div className="login-forgot">
              <span className="send-code" onClick={() => this.register()}>
                ???????????????
              </span>
              <span onClick={() => this.forgotPassword()}>????????????</span>
            </div>
            <div className="login-submit-btn">
              <Button type="primary" onClick={() => this.login()}>
                ??? ???
              </Button>
            </div>
          </div>
        )}

        {this.state.isForgot && !this.state.updatePassword && !this.state.isRegister && (
          <div>
            <List className="login-phone">
              <InputItem
                {...getFieldProps('forgotPhone', { rules: [{ required: true }] })}
                placeholder="??????????????????"
                labelNumber={2}>
                <i className="iconfont icon-phone" style={{ fontSize: '22px', color: '#888888' }} />
              </InputItem>
            </List>

            <List className="login-code">
              <InputItem
                {...getFieldProps('forgotCode', { rules: [{ required: true }] })}
                placeholder="??????????????????"
                labelNumber={2}
                extra={this.verificationCode('forgotPhone', 'resetpwd')}>
                <i className="iconfont icon-mima" style={{ fontSize: '22px', color: '#888888' }} />
              </InputItem>
            </List>

            <div className="login-back">
              <span
                onClick={() => this.setState({ updatePassword: false, isForgot: false, time: 60, isSendCode: false })}>
                ????????????
              </span>
            </div>

            <div className="login-submit-btn">
              <Button loading={this.state.btnLoading} type="primary" onClick={() => this.confirm()}>
                ??? ???
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
                placeholder="??????????????????"
                labelNumber={2}>
                <i className="iconfont icon-mima" style={{ fontSize: '22px', color: '#888888' }} />
              </InputItem>
            </List>

            <List className="login-password">
              <InputItem
                {...getFieldProps('newPassword1', { rules: [{ required: true }] })}
                type="password"
                placeholder="??????????????????"
                labelNumber={2}>
                <i className="iconfont icon-mima" style={{ fontSize: '22px', color: '#888888' }} />
              </InputItem>
            </List>

            <div className="login-back">
              <span
                onClick={() => this.setState({ updatePassword: false, isForgot: true, time: 60, isSendCode: false })}>
                ??????
              </span>
            </div>

            <div className="login-submit-btn">
              <Button loading={this.state.btnLoading} type="primary" onClick={() => this.updatePasswordFn()}>
                ??? ???
              </Button>
            </div>
          </div>
        )}

        {this.state.isRegister && !this.state.updatePassword && !this.state.isForgot && (
          <div>
            <List className="login-phone">
              <InputItem
                {...getFieldProps('registerUserName', { rules: [{ required: true }] })}
                placeholder="??????????????????"
                labelNumber={2}>
                <i className="iconfont icon-wode" style={{ fontSize: '22px', color: '#888888' }} />
              </InputItem>
            </List>

            <List className="login-phone">
              <InputItem
                {...getFieldProps('registerPhone', { rules: [{ required: true }] })}
                placeholder="??????????????????"
                labelNumber={2}>
                <i className="iconfont icon-phone" style={{ fontSize: '22px', color: '#888888' }} />
              </InputItem>
            </List>

            <List className="login-phone">
              <InputItem
                {...getFieldProps('registerCode', { rules: [{ required: true }] })}
                placeholder="??????????????????"
                labelNumber={2}
                extra={this.verificationCode('registerPhone', 'register')}>
                <i className="iconfont icon-mima" style={{ fontSize: '22px', color: '#888888' }} />
              </InputItem>
            </List>

            <List>
              <InputItem
                {...getFieldProps('registerPassword', { rules: [{ required: true }] })}
                type={'password'}
                placeholder="???????????????"
                labelNumber={2}>
                <i className="iconfont icon-mima" style={{ fontSize: '22px', color: '#888888' }} />
              </InputItem>
            </List>

            <div className="login-back">
              <span onClick={() => this.setState({ isRegister: false, time: 60, isSendCode: false })}>????????????</span>
            </div>

            <div className="login-submit-btn">
              <Button loading={this.state.btnLoading} type="primary" onClick={() => this.registerFn()}>
                ??? ???
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default createForm()(Login);
