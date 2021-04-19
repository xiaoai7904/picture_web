import React, { useEffect, useState } from 'react';
import { Button, Icon, Modal, Toast } from 'antd-mobile';
import PageImage from '@/components/pageImage/PageImage.view';
import pageHistory from '@/router/PageHistory';
import Http from '@/module/http/Http';
import SystemConfig, { vipMap } from '@/module/systemConfig/SystemConfig';
// import PageList from '@/components/pageList/PageList.view';
import { useGlobalStore } from '@/store/StoreContext';
import './Preview.style.less';
import PageHistory from '@/router/PageHistory';

interface resList {
  id: number;
  coverImage: string;
  photoNum: string;
  recommend: number;
  title: string;
}
interface commentParams {
  articleId: number;
  content: string;
}
interface perviewListParams {
  id: string;
}
export default function Preview(props: any) {
  const [resData, setResData] = useState<any>({});
  const [imgList, setImgList] = useState<any[]>([]);
  const routerParamsId = props.match.params.id;
  const { globalStore } = useGlobalStore();

  const getList = (params: perviewListParams) => {
    return new Promise(async resolve => {
      try {
        const res = await Http.of()?.post(SystemConfig.articleGet, params);
        setResData(res.data.data.info);
        setImgList(res.data.data.info.photoVoList);
        resolve(res);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const gotoHome = () => {
    pageHistory.replace('/home');
  };

  const gotoLogin = () => {
    pageHistory.replace('/login');
  };

  const changeEvent = (id: string) => {
    getList({ id }).then(() => {
      let $$preview = document.querySelector('.preview');
      if ($$preview) {
        $$preview.scrollTop = 0;
      }
    });
  };

  useEffect(() => {
    if (!imgList.length) {
      getList({ id: routerParamsId });
    }
  }, []);

  return (
    <div className="preview">
      {imgList.map((item, index) => {
        return <PageImage key={index} src={item.address} index={index} />;
      })}
      {/* <PageList httpParams={{ id: routerParamsId }} httpRequest={httpRequest} renderRow={renderRow}/> */}
      {(!globalStore.userInfo.phone ||
        globalStore.userInfo.vipGrade === 0 ||
        globalStore.userInfo.vipGrade < resData.vipLevel) && (
        <div className="preview-mask">
          <div className="preview-mask-box"></div>
        </div>
      )}
      <div className="preview-tips">
        {globalStore.userInfo.vipGrade < resData.vipLevel && (
          <p>
            全本共<span className="em">{resData.photoNum}</span>，订阅：需
            <span className="em">{vipMap[resData.vipGrade]}</span>
          </p>
        )}
        {!globalStore.userInfo.phone && (
          <>
            <p>您未登陆，请先登陆</p>
            <div className="btn-wrap">
              <Button className="btn" inline size="small" type="primary" onClick={() => gotoLogin()}>
                点击登陆
              </Button>
            </div>
          </>
        )}
        {(globalStore.userInfo.vipGrade === 0 || globalStore.userInfo.vipGrade < resData.vipLevel) && (
          <div className="btn-wrap">
            <Button className="btn" inline size="small" type="primary">
              开通VIP
            </Button>
          </div>
        )}
      </div>
      <div className="home-icon" onClick={gotoHome}>
        <i className="iconfont icon-shouye"></i>
      </div>
      <Recommend {...props} onChange={changeEvent} />
      <WorkDetails resData={resData} />
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
  const update = (id: number) => {
    PageHistory.push(`/preview/${id}`);
    props.onChange(id);
  };

  useEffect(() => {
    if (!recommendList.length) {
      getList();
    }
  }, []);
  return (
    <div className="recommend-wrap">
      <div className="recommend-title">
        <h1>推荐作品</h1>
      </div>
      <div>
        <div className="recommend-list">
          {recommendList.map((item: resList, index) => {
            return (
              <div key={index} className="recommend-list-item" onClick={() => update(item.id)}>
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
const WorkDetails = (props: any) => {
  const { resData } = props;
  const { globalStore } = useGlobalStore();
  const [detailsModalShow, setDetailsModalShow] = useState(false);
  const [commentModalShow, setCommentModalShow] = useState(false);
  const [personInfo, setPersonInfo] = useState([
    {
      name: resData.author,
      type: '模特',
      img: resData.authorHead,
      isLike: resData.modelFollow === 1,
    },
    { name: resData.model, type: '摄影', img: resData.modelHead, isLike: resData.authorFollow === 1 },
  ]);
  const [star, setStar] = useState(resData.isStar === 1);
  const [starNumber, setStarNumber] = useState(0);

  const gotoLogin = () => {
    PageHistory.replace('/login');
  };

  // 评论
  const httpComment = (params: commentParams) => {
    Http.of()
      ?.post(SystemConfig.commentSave, params)
      .then((data: any) => {
        console.log(data);
      });
  };
  const openDetailsModal = () => {
    setDetailsModalShow(true);
  };
  const closeDetailsModal = () => {
    setDetailsModalShow(false);
  };
  // 点赞
  const starEvent = () => {
    Http.of()
      ?.post(SystemConfig.articleStar, { id: resData.id })
      .then((data: any) => {
        let n = starNumber || resData.star;
        setStar(data.data.data.result === 1 ? true : false);
        setStarNumber(data.data.data.result === 1 ? ++n : --n);
      });
  };

  useEffect(() => {}, []);

  return (
    <div>
      <div className="work-details">
        <div className="work-details-left">
          <div className="left" onClick={openDetailsModal}>
            <span>作品详情</span>
            <Icon type="up"></Icon>
          </div>
          <div className="start" onClick={() => starEvent()}>
            <i className="iconfont icon-xin" style={{ fontSize: '22px', color: star ? '#f34747' : '#888888' }} />
            <span>&nbsp;{starNumber || resData.star}</span>
          </div>
          <div className="common">
            <i className="iconfont icon-pinglun" style={{ fontSize: '22px', color: '#888888' }} />
            <span>&nbsp;{resData.comment}</span>
          </div>
        </div>
        {!globalStore.userInfo.phone && (
          <Button className="btn" inline size="small" type="primary" onClick={() => gotoLogin()}>
            点击登陆
          </Button>
        )}
        {globalStore.userInfo.vipGrade === 0 && (
          <Button className="btn" inline size="small" type="primary">
            开通VIP
          </Button>
        )}
      </div>

      <Modal popup visible={detailsModalShow} onClose={closeDetailsModal} animationType="slide-up">
        <div className="details">
          <div className="details-title">作品简介</div>
          <div className="details-wrap">
            {personInfo.map((item, index) => {
              return (
                <div key={index} className="details-person">
                  <div className="details-person-left">
                    <img className="details-person-icon" src={item.img} alt="" />
                    <span className="details-person-type">{item.type}</span>
                    <span className="details-person-name">{item.name}</span>
                  </div>
                  {!item.isLike && <button className="details-person-like">喜欢TA</button>}
                </div>
              );
            })}

            <div className="details-info">
              <h3>{resData.title}</h3>
              <div>
                <p>
                  <span>发布时间:&nbsp;</span>
                  <span>{resData.publishDate}</span>
                </p>
                <p>
                  <span>数量:&nbsp;</span>
                  <span>{resData.photoNum}</span>
                </p>
                <p>
                  <span>作品标签:&nbsp;</span>
                  <span>{resData.tags}</span>
                </p>
                <p>
                  <span>作品简介:&nbsp;</span>
                  <span>{resData.remark}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal popup visible={commentModalShow} onClose={closeDetailsModal} animationType="slide-up">
        <div>评论</div>
      </Modal>
    </div>
  );
};
