import React from 'react';
import PageHistory from '@/router/PageHistory';

const defaultImg = require('@/assets/images/defaultImg.png');

export default function PageListItem(props: any) {
  const gotoPreview = (id: number) => {
    PageHistory.push({ pathname: `/preview`, state: { routerParamsId: id } });
  };
  const { rowData, index } = props;
  return (
    <div className="page-list-item" key={index} onClick={() => gotoPreview(rowData.id)}>
      <div className="page-list-item-img">
        <img
          src={rowData.coverImage}
          alt="嗨嗨美影社"
          width="100%"
          height="100%"
          onError={(e: any) => {
            e.target.onerror = null;
            e.target.src = defaultImg;
          }}
        />
        <span className="pic-number">{rowData.photoNum}</span>
        {rowData.recommend === 1 && <span className="pic-recommend">推荐</span>}
      </div>
      <div className="page-list-item-title">
        <span>{rowData.title}</span>
      </div>
    </div>
  );
}
