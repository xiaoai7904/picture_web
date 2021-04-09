import { observable, action, computed } from 'mobx';
import RouterConfig from '@/router/RouterConfig';

export class GlobalStore {
  @observable
  userInfo: userInfo = { userName: '' };

  @observable
  routerList = RouterConfig;

  @observable
  menuList: any[] = [];

  @observable
  openMenuList: any[] = [];

  @action.bound
  setUserInfo(userInfo: userInfo) {
    this.userInfo = userInfo;
  }

  @action.bound
  setRouterList(routerList: any) {
    this.routerList = routerList;
  }

  @action.bound
  setMenuList(menuList: any) {
    this.menuList = menuList;
  }

  @action.bound
  setOpenMenuList(menuList: any) {
    this.openMenuList = menuList;
  }
}

export default GlobalStore;

export interface userInfo {
  userName: string;
}
