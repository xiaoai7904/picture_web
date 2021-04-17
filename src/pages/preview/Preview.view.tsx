import React, { useEffect, useState } from 'react';
import { Button, Icon } from 'antd-mobile';
import PageImage from '@/components/pageImage/PageImage.view';
import pageHistory from '@/router/PageHistory';
import Http from '@/module/http/Http';
import SystemConfig from '@/module/systemConfig/SystemConfig';
import PageList from '@/components/pageList/PageList.view';
import './Preview.style.less';

interface resList {
  id: number;
  coverImage: string;
  photoNum: string;
  recommend: number;
  title: string;
}
export default function Preview(props: any) {
  const [imgList, setImgList] = useState<any[]>([]);
  const routerParamsId = props.match.params.id;

  const getList = async () => {
    try {
      const res = await Http.of()?.post(SystemConfig.articleGet, { id: routerParamsId });
      setImgList(res.data.data.info.photoVoList);
    } catch (error) {
      console.log(error);
    }
  };

  const gotoHome = () => {
    pageHistory.push('/home');
  };

  useEffect(() => {
    if (!imgList.length) {
      getList();
    }
  });

  return (
    <div className="preview">
      {imgList.map((item, index) => {
        return <PageImage key={index} src={item.address} index={index} />;
      })}
      {/* <PageList httpParams={{ id: routerParamsId }} httpRequest={httpRequest} renderRow={renderRow}/> */}
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
      <Recommend {...props} />
      <WorkDetails />
    </div>
  );
}

/**
 * 推荐列表
 */
const Recommend = (props: any) => {
  const [recommendList, setRecommendList] = useState([]);
  const routerParamsId = props.match.params.id;
  const getList = async () => {
    try {
      const res = await Http.of()?.post(SystemConfig.articleRecommend, { id: routerParamsId });
      setRecommendList(res.data.data.list);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!recommendList.length) {
      getList();
    }
  });
  return (
    <div className="recommend-wrap">
      <div className="recommend-title">
        <h1>推荐作品</h1>
      </div>
      <div>
        <div className="recommend-list">
          {recommendList.map((item: resList, index) => {
            return (
              <div key={index} className="recommend-list-item">
                <div className="recommend-list-item-img">
                  <img src={item.coverImage} alt="" width="100%" height="100%" />
                  <span className="pic-number">{item.photoNum}</span>
                  {item.recommend === 1 && <span className="pic-recommend">推荐</span>}
                </div>
                <div className="recommend-list-item-title">
                  <span>{item.title}</span>
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
