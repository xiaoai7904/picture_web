import React, { useEffect, useState } from 'react';
import { NavBar, Icon, PullToRefresh, Toast } from 'antd-mobile';
import PageHistory from '@/router/PageHistory';
import InfiniteScroll from 'react-infinite-scroller';
import PageListViewItem from '@/components/pageList/PageListItem.view';
import PageList from '@/components/pageList/PageList.view';
import Http from '@/module/http/Http';
import SystemConfig from '@/module/systemConfig/SystemConfig';
import Utils from '@/module/utils/Utils';
import './HomePage.style.less';

interface homeInfo {
  name?: string;
  id?: number;
  headImage?: string;
  isStar?: number; // 1关注 2未关注
  number?: number;
  status?: number;
  remark?: string;
}
/**
 * 个人主页
 */
export default function HomePage() {
  const location: any = PageHistory.location;
  const [info, setInfo] = useState<homeInfo>({});
  const [requestParams, setRequestParams] = useState({});
  const [showNavBar, setShowNavBar] = useState(true);

  const httpRequest = (params: any) => {
    return Http.of()?.post(SystemConfig.articleSearch, params);
  };

  const likeEvent = () => {
    const obj: any = {
      modelId: SystemConfig.modelFollow,
      authorId: SystemConfig.authorFollow,
    };
    Http.of()
      ?.post(obj[location.state.key], { [location.state.key]: location.state.params.id })
      .then((data: any) => {
        Toast.success(data.data.data.result === 1 ? '关注成功' : '取消成功');
        setInfo(Object.assign({}, info, { isStar: data.data.data.result }));
      });
  };

  useEffect(() => {
    if (location.state) {
      setShowNavBar(location.state.key !== 'tagId');
      setInfo(location.state.params);
      setRequestParams({ [location.state.key]: location.state.params.id });
    } else {
      PageHistory.replace('/home');
    }
  }, []);

  return (
    <div className="home-page">
      {!showNavBar && (
        <NavBar mode="dark" icon={<Icon type="left" />} onLeftClick={() => PageHistory.goBack()}>
          作品列表
        </NavBar>
      )}
      {showNavBar && (
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => PageHistory.goBack()}
          rightContent={[
            <div className="home-page-follow" onClick={() => likeEvent()}>
              {info.isStar === 1 ? '取消关注' : '关注TA'}
            </div>,
          ]}>
          TA的主页
        </NavBar>
      )}
      {showNavBar && (
        <div className="home-page-header">
          {!info.headImage && <i className="iconfont icon-yonghu1" style={{ fontSize: '30px', color: '#fff' }} />}
          {info.headImage && (
            <img className="comment-item-img" src={info.headImage} alt="用户头像" width="50" height="50" />
          )}
          <div className="user-info">
            <h3>{info.name}</h3>
            <span>{info.remark || '暂无简介'}</span>
          </div>
        </div>
      )}
      {showNavBar && <h3 className="home-page-title">作品列表</h3>}
      <div className="home-page-content">
        <PageList httpRequest={httpRequest} httpParams={requestParams} />
      </div>
    </div>
  );
}
