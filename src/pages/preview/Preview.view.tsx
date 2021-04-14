import React from 'react';
import { Button, Icon, ActionSheet } from 'antd-mobile';
import PageImage from '@/components/pageImage/PageImage.view';
import pageHistory from '@/router/PageHistory';
import './Preview.style.less';

export default function Preview() {
  const testData = [
    'https://img.yalayi.net/img/gallery/201/z0.jpg!mimg',
    'https://img.yalayi.net/img/gallery/201/z0.jpg!mimg',
    'https://img.yalayi.net/img/gallery/201/z0.jpg!mimg',
    'https://img.yalayi.net/img/gallery/201/z0.jpg!mimg',
    'https://img.yalayi.net/img/gallery/201/z0.jpg!mimg',
    'https://img.yalayi.net/img/gallery/201/z0.jpg!mimg',
  ];

  const gotoHome = () => {
    pageHistory.push('/home');
  };

  return (
    <div className="preview">
      {testData.map((item, index) => {
        return <PageImage key={index} src={item} index={index} />;
      })}
      <div className="preview-mask">
        <div className="preview-mask-box"></div>
      </div>
      <div className="preview-tips">
        <p>
          全本共<span className="em">46P</span>，订阅：需<span className="em">VIP1</span>
        </p>
        <p>您未登陆，请先登陆</p>
        <div className="btn-wrap">
          <Button className="btn" inline size="small" type="primary">
            点击登陆
          </Button>
        </div>
      </div>
      <div className="home-icon" onClick={gotoHome}>
        <i className="iconfont icon-shouye"></i>
      </div>
      <Recommend />
      <WorkDetails />
    </div>
  );
}

/**
 * 推荐列表
 */
const Recommend = () => {
  const data = [
    'https://img.yalayi.net/img/gallery/492/cover.jpg!coverimg',
    'https://img.yalayi.net/img/gallery/340/cover.jpg!coverimg',
    'https://img.yalayi.net/img/gallery/217/cover.jpg!coverimg',
    'https://img.yalayi.net/img/gallery/299/cover.jpg!coverimg',
  ];
  return (
    <div className="recommend-wrap">
      <div className="recommend-title">
        <h1>推荐作品</h1>
      </div>
      <div>
        <div className="recommend-list">
          {data.map((item, index) => {
            return (
              <div key={index} className="recommend-list-item">
                <div className="recommend-list-item-img">
                  <img src={item} alt="" width="100%" height="100%" />
                  <span className="pic-number">49P</span>
                </div>
                <div className="recommend-list-item-title">
                  <span>现实生活</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/**
 * 底部作品详情
 */
const WorkDetails = () => {
  const open = () => {
    // ActionSheet.showActionSheetWithOptions(
    //   {
    //     options: [],
    //     // cancelButtonIndex: BUTTONS.length - 1,
    //     // destructiveButtonIndex: BUTTONS.length - 2,
    //     // // title: 'title',
    //     message: () => <div>hhhhh</div>,
    //     maskClosable: true,
    //   },
    //   buttonIndex => {
        
    //   }
    // );
  };
  return (
    <div className="work-details">
      <div className="left" onClick={open}>
        <span>作品详情</span>
        <Icon type="up"></Icon>
      </div>
      <Button className="btn" inline size="small" type="primary">
        点击登陆
      </Button>
    </div>
  );
};
