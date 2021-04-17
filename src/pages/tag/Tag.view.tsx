import React, { useState, useEffect } from 'react';
import { SearchBar } from 'antd-mobile';
import Http from '@/module/http/Http';
import SystemConfig from '@/module/systemConfig/SystemConfig';
import './Tag.style.less';

interface TagTitleViewProps {
  name: string;
}
interface TagContentViewProps {
  list: any[];
}

const TagTitleView = (props: TagTitleViewProps) => {
  return <h3 className="tag-title">{props.name}</h3>;
};
const TagContentView = (props: TagContentViewProps) => {
  return (
    <div className="tag-content">
      {props.list.map((item, index) => {
        if (item.type === 'text') {
          return (
            <span key={index} className="tag-text">
              {item.title}
            </span>
          );
        }

        return (
          <div key={index} className="tag-img">
            <img src={item.icon} alt="" />
            <div className="tag-img-text">{item.title}</div>
          </div>
        );
      })}
    </div>
  );
};

export default function TagView() {
  const [authorList, setAuthorList] = useState([]);

  const [modelList, setModelList] = useState([]);

  const getAuthorList = async () => {
    try {
      const res = await Http.of()?.post(SystemConfig.authorList, {});
      console.log(res);
      // setModelList(res.data);
    } catch (error) {}
  };
  const getModelList = async () => {
    try {
      const res = await Http.of()?.post(SystemConfig.modelList, {});
      console.log(res);
      // setModelList(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    if (!authorList.length) {
      // getAuthorList();
    }
    if (!modelList.length) {
      // getModelList();
    }
  });

  return (
    <div className="tag">
      <SearchBar placeholder="作品/模特/摄影师" maxLength={8} />
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
