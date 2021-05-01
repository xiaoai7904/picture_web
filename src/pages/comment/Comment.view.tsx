import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import PageHistory from '@/router/PageHistory';

/**
 *
 * 我的评论
 */
export default function Comment() {
  return (
    <div className="help">
      <NavBar mode="light" icon={<Icon type="left" color="#8a8a8a" />} onLeftClick={() => PageHistory.goBack()}>
        我的评论
      </NavBar>
      <div className="comment-content"></div>
    </div>
  );
}
