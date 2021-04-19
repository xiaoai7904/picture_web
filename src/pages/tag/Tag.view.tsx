import React, { useState, useEffect } from 'react';
import { SearchBar } from 'antd-mobile';
import Http from '@/module/http/Http';
import SystemConfig from '@/module/systemConfig/SystemConfig';
import Utils from '@/module/utils/Utils';
import './Tag.style.less';

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
  return (
    <div className="tag-content">
      {props.list.map((item, index) => {
        if (props.type === 'text') {
          return (
            <span key={index} className="tag-text">
              {item.name}
            </span>
          );
        }

        return (
          <div key={index} className="tag-img">
            <img src={item.headImage} alt="" />
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
  const getAuthorList = async () => {
    try {
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

  const searchEvent = Utils.debounce((val: string) => {
    Http.of()
      ?.post(SystemConfig.articleSearch, val ? { searchName: val } : {})
      .then((data: any) => {
        console.log(data);
      });
  }, 500);

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
      <SearchBar placeholder="作品/模特/摄影师" onChange={(val: string) => searchEvent(val)} />
      <div className="tag-wrap">
        <TagTitleView name="热门标签" />
        <TagContentView list={tagList} type="text" />
      </div>
      <div className="tag-wrap">
        <TagTitleView name="热门模特" />
        <TagContentView list={authorList} />
      </div>
      <div className="tag-wrap">
        <TagTitleView name="热门摄影师" />
        <TagContentView list={modelList} />
      </div>
    </div>
  );
}
