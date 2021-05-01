import React, { useState } from 'react';
import { Toast, Tabs, NavBar, Icon } from 'antd-mobile';
import Http from '@/module/http/Http';
import SystemConfig from '@/module/systemConfig/SystemConfig';
import Utils from '@/module/utils/Utils';
import PageHistory from '@/router/PageHistory';
import PageList from '@/components/pageList/PageList.view';
import './Subscription.style.less'

interface listParams {
  page: number;
  pageSize: number;
}

export default function SubscribeList() {
  const httpRequest = (parmas: any) => {
    return Http.of()?.post(SystemConfig.subscribeList, parmas);
  };

  const gotoDetails = (item: any, type: string) => {
    PageHistory.push({
      pathname: '/homePage',
      state: { params: Object.assign({}, item, { id: item.subscribeId }), key: type },
    });
  };

  const rowRender1 = (rowData: any, sectionID: any, rowID: any) => {
    return (
      <div key={rowID} className="tag-img" onClick={() => gotoDetails(rowData, 'authorId')}>
        {!rowData.headImage && <i className="iconfont icon-yonghu1" style={{ fontSize: '30px', color: '#c3c3c3' }} />}
        {rowData.headImage && (
          <img className="comment-item-img" src={rowData.headImage} alt="用户头像" width="50" height="50" />
        )}
        <div className="tag-img-text">{rowData.name}</div>
      </div>
    );
  };

  const rowRender2 = (rowData: any, sectionID: any, rowID: any) => {
    return (
      <div key={rowID} className="tag-img" onClick={() => gotoDetails(rowData, 'modelId')}>
        {!rowData.headImage && <i className="iconfont icon-yonghu1" style={{ fontSize: '30px', color: '#c3c3c3' }} />}
        {rowData.headImage && (
          <img className="comment-item-img" src={rowData.headImage} alt="用户头像" width="50" height="50" />
        )}
        <div className="tag-img-text">{rowData.name}</div>
      </div>
    );
  };

  const tabs = [
    { title: '摄影师', type: 1 },
    { title: '模特', type: 2 },
  ];

  return (
    <div className="subscription">
      <NavBar mode="light" icon={<Icon type="left" color="#8a8a8a" />} onLeftClick={() => PageHistory.goBack()}>
        我订阅的
      </NavBar>
      <Tabs tabs={tabs} initialPage={0} prerenderingSiblingsNumber={0} swipeable={false}>
        <div className="my-like-item">
          <PageList httpRequest={httpRequest} httpParams={{ subscribeType: 1 }} renderRow={rowRender1} />
        </div>
        <div className="my-like-item">
          <PageList httpRequest={httpRequest} httpParams={{ subscribeType: 2 }} renderRow={rowRender2} />
        </div>
      </Tabs>
    </div>
  );
}
