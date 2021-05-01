import React, { useState, useEffect } from 'react';
import { SearchBar, Toast, PullToRefresh } from 'antd-mobile';
import Http from '@/module/http/Http';
import SystemConfig from '@/module/systemConfig/SystemConfig';
import Utils from '@/module/utils/Utils';
import './Tag.style.less';
import PageHistory from '@/router/PageHistory';
import PageList from '@/components/pageList/PageList.view';

interface TagTitleViewProps {
  name: string;
}
interface TagContentViewProps {
  list: any[];
  type?: string;
}

const TagTitleView = (props: TagTitleViewProps) => {
  return <h3 className="tag-title">{props.name}</h3>;
};
const TagContentView = (props: TagContentViewProps) => {
  const gotoHomePage = (item: any, type?: string) => {
    PageHistory.push({ pathname: '/homePage', state: { params: item, key: type } });
  };

  return (
    <div className="tag-content">
      {props.list.map((item, index) => {
        if (props.type === 'tagId') {
          return (
            <span key={index} className="tag-text" onClick={() => gotoHomePage(item, props.type)}>
              {item.name}
            </span>
          );
        }

        return (
          <div key={index} className="tag-img" onClick={() => gotoHomePage(item, props.type)}>
            {!item.headImage && <i className="iconfont icon-yonghu1" style={{ fontSize: '30px', color: '#c3c3c3' }} />}
            {item.headImage && (
              <img className="comment-item-img" src={item.headImage} alt="用户头像" width="50" height="50" />
            )}
            <div className="tag-img-text">{item.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default function TagView() {
  const [authorList, setAuthorList] = useState([]);

  const [modelList, setModelList] = useState([]);

  const [tagList, setTagList] = useState([]);

  const [httpParams, setHttpParams] = useState({});

  const [searchVal, setSeachVal] = useState('');

  const [refreshing, setRefreshing] = useState(false);

  const getAuthorList = async () => {
    try {
      // Toast.loading('加载中...');
      const res = await Http.of()?.post(SystemConfig.authorList, {});
      setAuthorList(res.data.data.list);
    } catch (error) {}
  };
  const getModelList = async () => {
    try {
      const res = await Http.of()?.post(SystemConfig.modelList, {});
      setModelList(res.data.data.list);
    } catch (error) {}
  };
  const getTagList = async () => {
    try {
      const res = await Http.of()?.post(SystemConfig.tagList, {});
      setTagList(res.data.data.list);
    } catch (error) {}
  };
  const onRefreshFn = () => {
    getModelList();
    getTagList();
    getAuthorList();
  };

  const searchEvent = Utils.debounce((val: string) => {
    setSeachVal(val);
    setHttpParams(val ? { searchName: val } : {});
  }, 500);

  const httpRequest = (params: any) => {
    return Http.of()?.post(SystemConfig.articleSearch, params);
  };

  useEffect(() => {
    if (!authorList.length) {
      getAuthorList();
    }
    if (!modelList.length) {
      getModelList();
    }
    if (!tagList.length) {
      getTagList();
    }
  }, []);

  return (
    <div className="tag">
      {searchVal && (
        <div>
          <SearchBar placeholder="作品/模特/摄影师" value={searchVal} onChange={(val: string) => searchEvent(val)} />
          <PageList httpRequest={httpRequest} httpParams={httpParams} />
        </div>
      )}
      {!searchVal && (
        <div className="tag-list">
          <SearchBar placeholder="作品/模特/摄影师" value={searchVal} onChange={(val: string) => searchEvent(val)} />
          <div className="tag-wrap">
            <TagTitleView name="热门标签" />
            <TagContentView list={tagList} type="tagId" />
          </div>
          <div className="tag-wrap">
            <TagTitleView name="热门模特" />
            <TagContentView list={modelList} type="modelId" />
          </div>
          <div className="tag-wrap">
            <TagTitleView name="热门摄影师" />
            <TagContentView list={authorList} type="authorId" />
          </div>
          {/* <PullToRefresh
            refreshing={refreshing}
            onRefresh={onRefreshFn}
            direction="down"
            damping={100}
            distanceToRefresh={25}
            indicator={{ deactivate: '下拉刷新' }}
            getScrollContainer={() => undefined}>
            <SearchBar placeholder="作品/模特/摄影师" value={searchVal} onChange={(val: string) => searchEvent(val)} />
            <div className="tag-wrap">
              <TagTitleView name="热门标签" />
              <TagContentView list={tagList} type="tagId" />
            </div>
            <div className="tag-wrap">
              <TagTitleView name="热门模特" />
              <TagContentView list={modelList} type="modelId" />
            </div>
            <div className="tag-wrap">
              <TagTitleView name="热门摄影师" />
              <TagContentView list={authorList} type="authorId" />
            </div>
          </PullToRefresh> */}
        </div>
      )}
    </div>
  );
}
