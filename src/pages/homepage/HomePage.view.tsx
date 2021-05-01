import React, { useEffect, useState } from 'react';
import { NavBar, Icon, Modal, PullToRefresh, Toast } from 'antd-mobile';
import PageHistory from '@/router/PageHistory';
import InfiniteScroll from 'react-infinite-scroller';
import PageListViewItem from '@/components/pageList/PageListItem.view';
import PageList from '@/components/pageList/PageList.view';
import Http from '@/module/http/Http';
import SystemConfig from '@/module/systemConfig/SystemConfig';
import Utils from '@/module/utils/Utils';
import { useGlobalStore } from '@/store/StoreContext';
import './HomePage.style.less';

const alert = Modal.alert;

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
  let { globalStore } = useGlobalStore();
  const location: any = PageHistory.location;
  const [info, setInfo] = useState<homeInfo>({});
  const [requestParams, setRequestParams] = useState({});
  const [showNavBar, setShowNavBar] = useState(true);
  const userinfo = globalStore.userInfo;

  const tips = () => {
    alert('提示', '您未登录，是否马上登录？', [
      { text: '取消', onPress: () => {}, style: 'default' },
      {
        text: '确定',
        onPress: () => {
          PageHistory.push(`/login`);
        },
      },
    ]);
  };

  const httpRequest = (params: any) => {
    return Http.of()?.post(SystemConfig.articleSearch, params);
  };

  const requestIsSubscript = () => {
    const obj: any = {
      authorId: 1,
      modelId: 2,
    };
    Http.of()
      ?.post(SystemConfig.isSubscribe, {
        subscribeId: location.state.params.id || location.state.params.subscribeId,
        subscribeType: obj[location.state.key],
      })
      .then((data: any) => {
        setInfo(Object.assign({}, location.state.params, { isStar: data.data.data.result }));
      })
      .catch(() => {
        setInfo(location.state.params);
      });
  };

  const likeEvent = () => {
    if (!userinfo.phone) {
      tips();
    } else {
      const obj: any = {
        modelId: { subscribeId: location.state.params.id || location.state.params.subscribeId, subscribeType: 2 },
        authorId: { subscribeId: location.state.params.id || location.state.params.subscribeId, subscribeType: 1 },
      };
      Http.of()
        ?.post(SystemConfig.authorSubscribe, obj[location.state.key])
        .then((data: any) => {
          Toast.success(data.data.data.result === 1 ? '订阅成功' : '取消成功');
          setInfo(Object.assign({}, info, { isStar: data.data.data.result }));
        });
    }
  };

  useEffect(() => {
    if (location.state) {
      setShowNavBar(location.state.key !== 'tagId');
      // setInfo(location.state.params);
      setRequestParams({ [location.state.key]: location.state.params.id || location.state.params.subscribeId });
      if (location.state.key !== 'tagId') {
        requestIsSubscript();
      } else {
        setInfo(location.state.params);
      }
    } else {
      PageHistory.replace('/home');
    }
  }, []);

  return (
    <div className="home-page">
      {!showNavBar && (
        <NavBar mode="light" icon={<Icon type="left" color="#8a8a8a" />} onLeftClick={() => PageHistory.goBack()}>
          作品列表
        </NavBar>
      )}
      {showNavBar && (
        <NavBar
          mode="light"
          icon={<Icon type="left" color="#8a8a8a" />}
          onLeftClick={() => PageHistory.goBack()}
          rightContent={[
            <div className="home-page-follow" onClick={() => likeEvent()}>
              {info.isStar === 1 ? '取消订阅' : '订阅TA'}
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
