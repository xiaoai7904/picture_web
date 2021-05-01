import React, { useEffect, useState } from 'react';
import { Button, Icon, Modal, Toast, InputItem } from 'antd-mobile';
import { createForm } from 'rc-form';
import PageImage from '@/components/pageImage/PageImage.view';
import pageHistory from '@/router/PageHistory';
import Http from '@/module/http/Http';
import SystemConfig, { vipMap } from '@/module/systemConfig/SystemConfig';
// import PageList from '@/components/pageList/PageList.view';
import { useGlobalStore } from '@/store/StoreContext';
import './Preview.style.less';
import InfiniteScroll from 'react-infinite-scroller';
import Utils from '@/module/utils/Utils';
import PageHistory from '@/router/PageHistory';

const alert = Modal.alert;

const defaultImg = require('@/assets/images/defaultImg.png');

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

interface commonListParams {
  articleId: string;
  page: number;
  pageSize: number;
}

interface commentListItem {
  id: number;
  userFrontId: number;
  userFrontName: string;
  content: string;
  headImage: string;
  createTIme: string;
}

export default function Preview(props: any) {
  const location: any = pageHistory.location;
  const [resData, setResData] = useState<any>({});
  const [imgList, setImgList] = useState<any[]>([]);
  const [routerParamsId, setRouterParamsId] = useState('');
  const { globalStore } = useGlobalStore();

  const getList = (params: perviewListParams) => {
    return new Promise(async resolve => {
      try {
        Toast.loading('加载中...');
        const res = await Http.of()?.post(SystemConfig.articleGet, params);
        setResData(res.data.data.info);
        setImgList(res.data.data.info.photoVoList);
        Toast.hide();
        resolve(res);
      } catch (error) {
        console.log(error);
        Toast.hide();
      }
    });
  };

  const gotoHome = () => {
    pageHistory.replace('/home');
  };

  const gotoLogin = () => {
    pageHistory.replace('/login');
  };

  const gotoRecharge = () => {
    PageHistory.push('/recharge');
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
    if (location.state) {
      const routerParamsId = location.state.routerParamsId;
      setRouterParamsId(routerParamsId);
      if (!imgList.length) {
        getList({ id: routerParamsId });
      }
    } else {
      PageHistory.replace('/home');
    }
  }, []);

  return (
    <div className="preview">
      {imgList.map((item, index) => {
        return <PageImage key={index} src={item.address} index={index} />;
      })}
      {/* <PageList httpParams={{ id: routerParamsId }} httpRequest={httpRequest} renderRow={renderRow}/> */}
      {resData.login !== 2 && (
        <div className="preview-mask">
          <div className="preview-mask-box"></div>
        </div>
      )}
      <div className="preview-tips">
        {resData.login === 1 && (
          <p>
            全本共<span className="em">{resData.photoNum}</span>，订阅：需
            <span className="em">{vipMap[resData.vipGrade]}</span>
          </p>
        )}
        {resData.login === 0 && (
          <>
            <p>您未登陆，请先登陆</p>
            <div className="btn-wrap">
              <Button className="btn" inline size="small" type="primary" onClick={() => gotoLogin()}>
                点击登陆
              </Button>
            </div>
          </>
        )}
        {resData.login === 1 && (
          <>
            <p>您的会员等级不够，请升级</p>
            <div className="btn-wrap">
              <Button className="btn" inline size="small" type="primary" onClick={() => gotoRecharge()}>
                开通VIP
              </Button>
            </div>
          </>
        )}
      </div>
      <div className="home-icon" onClick={gotoHome}>
        <i className="iconfont icon-shouye"></i>
      </div>
      <Recommend {...props} onChange={changeEvent} routerParamsId={routerParamsId} />
      <WorkDetails resData={resData} />
    </div>
  );
}

/**
 * 推荐列表
 */
const Recommend = (props: any) => {
  const [recommendList, setRecommendList] = useState([]);
  // const routerParamsId = props.match.params.id;
  const getList = async () => {
    try {
      const res = await Http.of()?.post(SystemConfig.articleRecommend, { id: props.routerParamsId });
      setRecommendList(res.data.data.list);
    } catch (error) {
      console.log(error);
    }
  };
  const update = (id: number) => {
    PageHistory.push({ pathname: `/preview`, state: { routerParamsId: id } });
    props.onChange(id);
  };

  useEffect(() => {
    if (!recommendList.length && props.routerParamsId) {
      getList();
    }
  }, [props.routerParamsId]);

  return (
    <div className="recommend-wrap">
      <div className="recommend-title">
        <h1>推荐作品</h1>
      </div>
      <div className="recommend-content">
        <div className="recommend-list">
          {recommendList.map((item: resList, index) => {
            return (
              <div key={index} className="recommend-list-item" onClick={() => update(item.id)}>
                <div className="recommend-list-item-img">
                  <img
                    src={item.coverImage}
                    alt=""
                    width="100%"
                    height="100%"
                    onError={(e: any) => {
                      e.target.onerror = null;
                      e.target.src = defaultImg;
                    }}
                  />
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
const WorkDetailsView = (props: any) => {
  const { resData } = props;
  const { globalStore } = useGlobalStore();
  const [detailsModalShow, setDetailsModalShow] = useState(false);
  const [commentModalShow, setCommentModalShow] = useState(false);
  const [personInfo, setPersonInfo] = useState<any[]>([]);
  const [star, setStar] = useState(false);
  const [starNumber, setStarNumber] = useState(0);
  const [commentList, setCommentList] = useState<any[]>([]);
  const [commentVal, setCommentVal] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [commentRequestPage, setCommentRequestPage] = useState(1);
  const { getFieldProps } = props.form;

  const gotoLogin = () => {
    PageHistory.replace('/login');
  };
  const gotoRecharge = () => {
    PageHistory.push('/recharge');
  };

  const tips = () => {
    alert('提示', '您未登录，是否马上登录？', [
      { text: '取消', onPress: () => {}, style: 'default' },
      {
        text: '确定',
        onPress: () => {
          gotoLogin();
        },
      },
    ]);
  };

  // 评论
  const httpComment = (params: commentParams) => {
    return new Promise((resolve, reject) => {
      Http.of()
        ?.post(SystemConfig.commentSave, params)
        .then((data: any) => {
          resolve(data);
        })
        .catch(() => {
          reject();
        });
    });
  };
  // 评论列表
  const httpCommentList = (params: commonListParams, flag: boolean) => {
    return new Promise((resolve, reject) => {
      Toast.loading('加载中...');
      Http.of()
        ?.post(SystemConfig.commentList, params)
        .then((data: any) => {
          if (data.data.data && data.data.data.page && data.data.data.page.list) {
            if (commentRequestPage < data.data.data.page.totalPage) {
              setCommentRequestPage(commentRequestPage + 1);
              setHasMore(true);
            } else {
              setHasMore(false);
            }

            let _list = flag ? [] : Utils.deepClone(commentList);
            data.data.data.page.list.forEach((item: commentListItem) => {
              _list.push(commentListItemRender(item));
            });
            setCommentList(_list);
            Toast.hide();
          }

          resolve(data);
        })
        .catch(() => {
          reject();
        });
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
    if (resData.login === 0) {
      tips();
    } else {
      Toast.loading('加载中...');
      Http.of()
        ?.post(SystemConfig.articleStar, { id: resData.id })
        .then((data: any) => {
          let n = starNumber;
          setStar(data.data.data.result === 1 ? true : false);
          setStarNumber(data.data.data.result === 1 ? ++n : --n);
          Toast.hide();
        });
    }
  };
  // 评论
  const commentEvent = () => {
    if (commentList.length) {
      setCommentModalShow(true);
    } else {
      httpCommentList({ articleId: resData.id, page: 1, pageSize: 10 }, true).then(() => {
        setCommentModalShow(true);
      });
    }
  };
  // 打开评论列表弹窗
  const closeCommentModal = () => {
    setCommentModalShow(false);
  };
  // 发送评论
  const sendComment = () => {
    if (!commentVal) return false;

    Toast.loading('加载中...');
    httpComment({ articleId: resData.id, content: commentVal }).then(data => {
      updateScrollTop();
      setCommentVal('');
      setCommentRequestPage(2);
      setHasMore(true);
      httpCommentList({ articleId: resData.id, page: 1, pageSize: 20 }, true);
    });
  };
  // 删除评论
  const delComment = (id: number) => {
    if (resData.login === 0) {
      tips();
    } else {
      Toast.loading('加载中...');
      Http.of()
        ?.post(SystemConfig.delComment, { id })
        .then(() => {
          updateScrollTop();
          setHasMore(true);
          setCommentRequestPage(2);
          httpCommentList({ articleId: resData.id, page: 1, pageSize: 20 }, true);
        });
    }
  };
  // 滚动加载数据
  const loadFunc = () => {
    httpCommentList({ articleId: resData.id, page: commentRequestPage, pageSize: 20 }, false);
  };

  // 更新滚动条位置
  const updateScrollTop = () => {
    let $$content = document.querySelector('.comment-details-content');
    if ($$content) {
      $$content.scrollTo(0, 0);
    }
  };

  // 关注作者和模特
  const likeEvent = (type: number) => {
    if (resData.login === 0) {
      tips();
    } else {
      const httpRequest = (url: string, params: { [key: string]: number }) => {
        Toast.loading('加载中...');
        Http.of()
          ?.post(url, params)
          .then((data: any) => {
            Toast.success(data.data.data.result === 1 ? '关注成功' : '取消成功');
            let _personInfo = Utils.deepClone(personInfo);
            _personInfo.forEach((item: any) => {
              if (item.id === type) {
                item.isLike = data.data.data.result === 1;
              }
            });
            setPersonInfo(_personInfo);
          });
      };

      const obj: any = {
        1: {
          url: SystemConfig.modelFollow,
          params: { modelId: resData.modelId },
        },
        2: {
          url: SystemConfig.authorFollow,
          params: { authorId: resData.authorId },
        },
      };

      httpRequest(obj[type].url, obj[type].params);
    }
  };

  useEffect(() => {
    setPersonInfo([
      {
        id: 1,
        name: resData.author,
        type: '模特',
        img: resData.authorHead,
        isLike: resData.modelFollow === 1,
      },
      { id: 2, name: resData.model, type: '摄影', img: resData.modelHead, isLike: resData.authorFollow === 1 },
    ]);
    setStar(resData.isStar === 1);
    setStarNumber(resData.star);
  }, [resData]);

  const commentListItemRender = (item: commentListItem) => {
    return (
      <div className="comment-item" key={item.id}>
        {!item.headImage && <i className="iconfont icon-yonghu1" style={{ fontSize: '30px', color: '#888' }} />}
        {item.headImage && (
          <img className="comment-item-img" src={item.headImage} alt="用户头像" width="50" height="50" />
        )}
        <div className="comment-item-right">
          <h3>{item.userFrontName}</h3>
          <p>{item.content}</p>
          <span>{item.createTIme.replace(/T/g, ' ')}</span>
        </div>
        {item.userFrontId === globalStore.userInfo.id && (
          <i
            className="iconfont icon-shanchu"
            onClick={() => delComment(item.id)}
            style={{ fontSize: '18px', color: '#888' }}
          />
        )}
      </div>
    );
  };
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
            <span>&nbsp;{starNumber}</span>
          </div>
          <div className="common" onClick={() => commentEvent()}>
            <i className="iconfont icon-pinglun" style={{ fontSize: '22px', color: '#888888' }} />
            <span>&nbsp;{resData.comment}</span>
          </div>
        </div>
        {!globalStore.userInfo.phone && (
          <Button className="btn" inline size="small" type="primary" onClick={() => gotoLogin()}>
            点击登陆
          </Button>
        )}
        {(globalStore.userInfo.remaining === 0 || globalStore.userInfo.vipGrade < resData.vipLevel) &&
          globalStore.userInfo.phone && (
            <Button className="btn" inline size="small" type="primary" onClick={() => gotoRecharge()}>
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
                    {!item.img && <i className="iconfont icon-yonghu1" style={{ fontSize: '30px', color: '#888' }} />}
                    {item.img && (
                      <img className="details-person-icon" src={item.img} alt="用户头像" width="50" height="50" />
                    )}
                    <span className="details-person-type">{item.type}</span>
                    <span className="details-person-name">{item.name}</span>
                  </div>
                  {resData.login !== 0  && <button className="details-person-like" onClick={() => likeEvent(item.id)}>
                    {item.isLike ? '取消喜欢' : '喜欢TA'}
                  </button>}
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
                  <span>{resData.remark || '暂无简介'}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal popup visible={commentModalShow} onClose={closeCommentModal} animationType="slide-up">
        <div className="comment-details">
          <div className="comment-details-title">作品评论</div>
          <div className="comment-details-content">
            <InfiniteScroll
              initialLoad={false}
              pageStart={0}
              loadMore={loadFunc}
              hasMore={hasMore}
              loader={
                <div className="loader" key={0}>
                  加载中...
                </div>
              }
              useWindow={false}>
              {commentList}
            </InfiniteScroll>
          </div>
          <div className="comment-details-bottom">
            <InputItem
              {...getFieldProps('commentText')}
              value={commentVal}
              placeholder="请输入评论"
              disabled={resData.login === 0}
              onChange={val => setCommentVal(val)}
              extra={
                resData.login !== 0 && <span className="comment-send" onClick={() => sendComment()}>
                  发送
                </span>
              }></InputItem>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const WorkDetails = createForm()(WorkDetailsView);
