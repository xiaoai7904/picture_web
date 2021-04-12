import React, { useEffect } from 'react';
import PageImage from '@/components/pageImage/PageImage.view';

import './Preview.style.less';

export default function Preview() {
  const testData = [
    'https://img.yalayi.net/img/gallery/201/z0.jpg!mimg',
    'https://img.yalayi.net/img/gallery/201/z0.jpg!mimg',
    'https://img.yalayi.net/img/gallery/201/z0.jpg!mimg',
    'https://img.yalayi.net/img/gallery/201/z0.jpg!mimg',
    'https://img.yalayi.net/img/gallery/201/z0.jpg!mimg',
    'https://img.yalayi.net/img/gallery/201/z0.jpg!mimg'
  ]

  useEffect(() => {
    // window.onresize = function() {
    //   console.log()
    // }
  })

  return (
    <div className="preview">
      {
        testData.map((item, index) => {
          return <PageImage key={index} src={item} />
        })
      }
      <div className="preview-mask">
        <div className="preview-mask-box"></div>
      </div>
    </div>
  );
}
