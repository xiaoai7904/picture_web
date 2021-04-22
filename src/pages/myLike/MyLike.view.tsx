import React, { useState } from 'react';
import { Toast, Tabs, NavBar, Icon } from 'antd-mobile';
import Http from '@/module/http/Http';
import SystemConfig from '@/module/systemConfig/SystemConfig';
import Utils from '@/module/utils/Utils';
import PageHistory from '@/router/PageHistory';
import PageList from '@/components/pageList/PageList.view';

import './MyLike.style.less';

const defaultImg = require('@/assets/images/404.jpg');

interface listParams {
  page: number;
  pageSize: number;
}
export default function MyLike() {
  const rowRender = (rowData: any, sectionID: any, rowID: any) => {
    return (
      <div key={rowID} className="tag-img">
        {!rowData.headImage && <i className="iconfont icon-yonghu1" style={{ fontSize: '30px', color: '#c3c3c3' }} />}
        {rowData.headImage && (
          <img className="comment-item-img" src={rowData.headImage} alt="用户头像" width="50" height="50" />
        )}
        <div className="tag-img-text">{rowData.name}</div>
      </div>
    );
  };

  const httpRequest = (params: any) => {
    return Http.of()?.post(SystemConfig.userfrontFollowList, params);
  };

  const tabs = [
    { title: '作品', type: 1 },
    { title: '模特', type: 2 },
    { title: '摄影师', type: 3 },
  ];

  return (
    <div className="my-like">
      <NavBar mode="dark" icon={<Icon type="left" />} onLeftClick={() => PageHistory.goBack()}>
        我喜欢的
      </NavBar>
      <Tabs tabs={tabs} initialPage={0} prerenderingSiblingsNumber={0} swipeable={false}>
        <div className="my-like-item">
          <PageList httpRequest={httpRequest} httpParams={{ type: 1 }} />
        </div>
        <div className="my-like-item my-like-tag">
          <PageList httpRequest={httpRequest} httpParams={{ type: 2 }} renderRow={rowRender} />
        </div>
        <div className="my-like-item">
          <PageList httpRequest={httpRequest} httpParams={{ type: 3 }} renderRow={rowRender} />
        </div>
      </Tabs>
    </div>
  );
}
