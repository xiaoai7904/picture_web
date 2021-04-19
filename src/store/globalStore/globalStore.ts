import { observable, action, computed } from 'mobx';
import RouterConfig from '@/router/RouterConfig';

export class GlobalStore {
  @observable
  userInfo: userInfo = { userName: '', phone: '', vipGrade: 1, status: 1, lastLoginTime: '' };

  @observable
  selectedTab: string = 'home';

  @action
  setUserInfo(userInfo?: userInfo) {
    if (!userInfo) {
      this.userInfo = { userName: '', phone: '', vipGrade: 1, status: 1, lastLoginTime: '' };
    } else {
      this.userInfo = userInfo;
    }
  }

  @action
  setSelectedTab(tab: string) {
    console.log(tab)
    this.selectedTab = tab;
  }
}

export default GlobalStore;

export interface userInfo {
  userName: string;
  phone: string;
  vipGrade: number; // 会员标示 1 普通用户 2 会员
  status: number; // 状态 1 启用 2 禁用
  lastLoginTime: string;
}
