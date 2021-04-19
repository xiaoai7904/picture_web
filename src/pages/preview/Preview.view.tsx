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
import PageHistory from '@/router/PageHistory';
import InfiniteScroll from 'react-infinite-scroller';
import Utils from '@/module/utils/Utils';

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
const defaultImgs: string[] = [
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fyouimg1.c-ctrip.com%2Ftarget%2Ftg%2F035%2F063%2F726%2F3ea4031f045945e1843ae5156749d64c.jpg&refer=http%3A%2F%2Fyouimg1.c-ctrip.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621400178&t=09efdc9b12431ce0e7f07f246dbdb7af',
  'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4087057811,445331467&fm=26&gp=0.jpg',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201410%2F04%2F20141004172507_J8Mty.jpeg&refer=http%3A%2F%2Fcdn.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621400178&t=4d939a5fd859290955ea47f57689b541',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F1812.img.pp.sohu.com.cn%2Fimages%2Fblog%2F2009%2F11%2F18%2F18%2F8%2F125b6560a6ag214.jpg&refer=http%3A%2F%2F1812.img.pp.sohu.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621400178&t=3c6702a1cd3b3dacc8806a167e79bbaa',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F4c%2Fa6%2F31%2F4ca631a8841304be2351295d50cf801d.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621400178&t=bd36be20b74bd037aeb814c73fb8a9d5',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage1.nphoto.net%2Fnews%2Fimage%2F201307%2F084a057c5177ae78.jpg&refer=http%3A%2F%2Fimage1.nphoto.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621400178&t=0a7b7ed320d67e95934e698c740c7349',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1108%2F09%2Fc5%2F8597586_8597586_1312885301234_mthumb.jpg&refer=http%3A%2F%2Fimg.pconline.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621400178&t=6d3590e540ceffe905ebd7b2f06f3e77',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fblog%2F201306%2F25%2F20130625150506_fiJ2r.jpeg&refer=http%3A%2F%2Fcdn.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621400178&t=5e63ced452f566f89a04dd21171123c3',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic25.nipic.com%2F20121107%2F8847866_164210379199_2.jpg&refer=http%3A%2F%2Fpic25.nipic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621400246&t=1c1b763435cec884c5b87fd9ce7ce78b',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic35.nipic.com%2F20131120%2F12871060_175530215154_2.jpg&refer=http%3A%2F%2Fpic35.nipic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621400246&t=0ed53a209aefd2ec995c7ff3e27dd9b2',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic27.nipic.com%2F20130129%2F11507979_020415120167_2.jpg&refer=http%3A%2F%2Fpic27.nipic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621400246&t=fbf6c836e973c9075cefc532f9349a35',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1107%2F19%2Fc2%2F8373117_8373117_1311046234225_mthumb.jpg&refer=http%3A%2F%2Fimg.pconline.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621400246&t=dcfa9c275c078c1eb8895be5635dc701',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic5.nipic.com%2F20100225%2F1399111_094253001130_2.jpg&refer=http%3A%2F%2Fpic5.nipic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621400246&t=5595d0270852a157fff6b0e7c924b399',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1402%2F07%2Fc7%2F31066355_31066355_1391779709500_mthumb.jpg&refer=http%3A%2F%2Fimg.pconline.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621400246&t=029cbf8fe880ac887142c04d07d7b837',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201410%2F22%2F20141022204337_Br4VB.thumb.700_0.jpeg&refer=http%3A%2F%2Fcdn.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621400246&t=3c72705c15f8947828e6bc6404b627cd',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fyouimg1.c-ctrip.com%2Ftarget%2Ftg%2F601%2F164%2F039%2Fa9e3040da3594dbcab7723278dfb7cdc.jpg&refer=http%3A%2F%2Fyouimg1.c-ctrip.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621400246&t=0d5f08bbf2263aca046d1c9573866edf',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201406%2F09%2F20140609202918_hTXRU.jpeg&refer=http%3A%2F%2Fcdn.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621400246&t=8d5b8ee9286cae90154bcf5eaa8ddb8b',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201408%2F25%2F20140825185505_VV3RE.jpeg&refer=http%3A%2F%2Fcdn.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621400246&t=d8c2093bbf76e56894e6e5a2bc400ba2',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201409%2F06%2F20140906020558_h4VfY.png&refer=http%3A%2F%2Fcdn.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621400246&t=4543762e4d141194745927b9893a126c',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.nipic.com%2F2008-11-20%2F20081120122029174_2.jpg&refer=http%3A%2F%2Fpic1.nipic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621400246&t=40cb544ef342a07ec46cb8fdec395640',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201209%2F08%2F20120908134318_YVAwx.jpeg&refer=http%3A%2F%2Fcdn.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621400347&t=542009c4976fbc404d6effba59aa0835',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbbsimg0.dahe.cn%2FMon_1209%2F1038_949100_50f1e463bdf867e.jpg&refer=http%3A%2F%2Fbbsimg0.dahe.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621400347&t=0081cb3ef1ff50211f7a23141b9fa8c9',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201407%2F16%2F20140716212515_TvYEA.jpeg&refer=http%3A%2F%2Fcdn.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621400347&t=ba1621beadb0313d59df5c676652f512',
  'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3824886304,665215047&fm=26&gp=0.jpg',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi3.s1.dpfile.com%2Fpc%2Fc8fe33e3777f9f74db6be2284fd76d3a%28700x700%29%2Fthumb.jpg&refer=http%3A%2F%2Fi3.s1.dpfile.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621400347&t=1990d4aa787a4012340cf79851e82820',
];

export default function Preview(props: any) {
  const [resData, setResData] = useState<any>({});
  const [imgList, setImgList] = useState<any[]>([]);
  const routerParamsId = props.match.params.id;
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
const WorkDetailsView = (props: any) => {
  const { resData } = props;
  const { globalStore } = useGlobalStore();
  const [detailsModalShow, setDetailsModalShow] = useState(false);
  const [commentModalShow, setCommentModalShow] = useState(false);
  const [personInfo, setPersonInfo] = useState<any[]>([]);
  const [star, setStar] = useState(resData.isStar === 1);
  const [starNumber, setStarNumber] = useState(0);
  const [commentList, setCommentList] = useState<any[]>([]);
  const [commentVal, setCommentVal] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [commentRequestPage, setCommentRequestPage] = useState(1);
  const { getFieldProps } = props.form;

  const gotoLogin = () => {
    PageHistory.replace('/login');
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
          if (data.data.data && data.data.data.page && data.data.data.page.list && data.data.data.page.list.length) {
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
    Toast.loading('加载中...');
    Http.of()
      ?.post(SystemConfig.articleStar, { id: resData.id })
      .then((data: any) => {
        let n = starNumber || resData.star;
        setStar(data.data.data.result === 1 ? true : false);
        setStarNumber(data.data.data.result === 1 ? ++n : --n);
        Toast.hide();
      });
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
      httpCommentList({ articleId: resData.id, page: 1, pageSize: 10 }, true);
    });
  };
  // 删除评论
  const delComment = () => {
    Toast.loading('加载中...');
    Http.of()
      ?.post(SystemConfig.delComment, { id: resData.id })
      .then(() => {
        updateScrollTop();
        setHasMore(true);
        setCommentRequestPage(2);
        httpCommentList({ articleId: resData.id, page: 1, pageSize: 20 }, true);
      });
  };
  // 滚动加载数据
  const loadFunc = () => {
    httpCommentList({ articleId: resData.id, page: commentRequestPage, pageSize: 10 }, false);
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
            onClick={() => delComment()}
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
            <span>&nbsp;{starNumber || resData.star}</span>
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
                  <button className="details-person-like" onClick={() => likeEvent(item.id)}>
                    {item.isLike ? '取消关注' : '喜欢TA'}
                  </button>
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
              onChange={val => setCommentVal(val)}
              extra={
                <span className="comment-send" onClick={() => sendComment()}>
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
