import { observable, action, computed } from 'mobx';
import RouterConfig from '@/router/RouterConfig';

export class GlobalStore {
  @observable
  userInfo: userInfo = {
    id: '',
    userName: '',
    phone: '',
    vipGrade: 1,
    status: 1,
    lastLoginTime: '',
    remaining: 0,
    amount: 0,
  };

  @observable
  selectedTab: string = 'home';

  @action
  setUserInfo(userInfo?: userInfo) {
    if (!userInfo) {
      this.userInfo = {
        id: '',
        userName: '',
        phone: '',
        vipGrade: 1,
        status: 1,
        lastLoginTime: '',
        remaining: 0,
        amount: 0,
      };
    } else {
      this.userInfo = userInfo;
    }
  }

  @action
  setSelectedTab(tab: string) {
    this.selectedTab = tab;
  }
}

export default GlobalStore;

export interface userInfo {
  id: number | string;
  userName: string;
  phone: string;
  vipGrade: number; // 会员标示 1 普通用户 2 会员
  status: number; // 状态 1 启用 2 禁用
  lastLoginTime: string;
  remaining: number; // 到期时间（天）
  amount: number; // 余额
}
