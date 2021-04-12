import React from 'react';
import { SearchBar } from 'antd-mobile';
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
          return <span key={index} className="tag-text">{item.title}</span>;
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
  const list = [
    {
      name: '推荐标签',
      list: [
        {
          title: '文艺清纯',
          type: 'text',
        },
        {
          title: '气质女神',
          type: 'text',
        },
        {
          title: '气质女神1',
          type: 'text',
        },
        {
          title: '气质女神2',
          type: 'text',
        },
        {
          title: '气质女神3',
          type: 'text',
        },
        {
          title: '气质女神4',
          type: 'text',
        },
      ],
    },
    {
      name: '热门模特',
      list: [
        {
          title: '海棠',
          type: 'img',
          icon: 'https://img.yalayi.net/img/models/209.jpg!coverimg',
        },
        {
          title: '海棠',
          type: 'img',
          icon: 'https://img.yalayi.net/img/models/209.jpg!coverimg',
        },
        {
          title: '海棠',
          type: 'img',
          icon: 'https://img.yalayi.net/img/models/209.jpg!coverimg',
        },
        {
          title: '海棠',
          type: 'img',
          icon: 'https://img.yalayi.net/img/models/209.jpg!coverimg',
        },
        {
          title: '海棠',
          type: 'img',
          icon: 'https://img.yalayi.net/img/models/209.jpg!coverimg',
        },
      ],
    },
    {
        name: '热门摄影师',
        list: [
          {
            title: '再小吴',
            type: 'img',
            icon: 'https://img.yalayi.net/img/filmmakers/20.jpg!coverimg',
          },
          {
            title: '再小吴',
            type: 'img',
            icon: 'https://img.yalayi.net/img/filmmakers/20.jpg!coverimg',
          },
          {
            title: '再小吴',
            type: 'img',
            icon: 'https://img.yalayi.net/img/filmmakers/20.jpg!coverimg',
          },
          {
            title: '再小吴',
            type: 'img',
            icon: 'https://img.yalayi.net/img/filmmakers/20.jpg!coverimg',
          },
          {
            title: '再小吴',
            type: 'img',
            icon: 'https://img.yalayi.net/img/filmmakers/20.jpg!coverimg',
          },
        ],
      },
  ];
  return (
    <div className="tag">
      <SearchBar placeholder="作品/模特/摄影师" maxLength={8} />
      {list.map((item, index) => {
        return (
          <div className="tag-wrap" key={index}>
            <TagTitleView name={item.name} />
            <TagContentView list={item.list} />
          </div>
        );
      })}
    </div>
  );
}
