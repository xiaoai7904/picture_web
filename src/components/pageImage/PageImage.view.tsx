import React, { useState, useEffect } from 'react';
import { observer, useLocalStore } from 'mobx-react';
import Utils from '@/module/utils/Utils';
import './PageImage.style.less';
require('intersection-observer');

export interface PageImageProps {
  src: string;
  index: number;
}
/**
 * 图片组件
 * @param props
 */
const PageImage = observer((props: PageImageProps) => {
  //   const [imageHeight, setImageHeight] = useState(400);
  //   const [orgHeight, setOrgHeight] = useState(0);
  //   const [orgWidth, setOrgWidth] = useState(0);

  const pageImageState = useLocalStore(() => {
    return {
      imageHeight: 560,
      orgHeight: 0,
      orgWidth: 0,
      isShow: false,
      setImageHeight(height: number) {
        pageImageState.imageHeight = height;
      },
      setOrgWidth(width: number) {
        pageImageState.orgWidth = width;
      },
      setOrgHeight(height: number) {
        pageImageState.orgHeight = height;
      },
      setIsShow(val: boolean) {
        pageImageState.isShow = val;
      },
    };
  });
  let imgIns: any = null;

  // 图片原始比例
  const ratio = () => pageImageState.orgWidth / pageImageState.orgHeight;
  // 自适应图片
  const resizeImg = () => {
    let $$pageImage = document.getElementById(`pageImage${props.index}`); //document.querySelectorAll('.page-image')[props.index];
    if ($$pageImage) {
      let w = $$pageImage.getClientRects()[0].width;
      pageImageState.setImageHeight(w / ratio());
    }
  };

  // 初始化
  const initImage = () => {
    const img = new Image();
    img.onload = (e: any) => {
      // console.log(props.index, arg)
      console.log(e.path[0].id, img.naturalWidth, img.naturalHeight);
      pageImageState.setOrgHeight(img.naturalHeight);
      pageImageState.setOrgWidth(img.naturalWidth);
      resizeImg();
    };

    img.src = props.src;
    img.id = 'aaaa' + props.index;
  };

  let resizeEvent = Utils.debounce(() => {
    resizeImg();
  }, 500);

  const handler = (entries: any, intersectionObserver: any) => {
    entries.forEach((item: any) => {
      // 遍历entries数组
      if (item.isIntersecting) {
        // 当前元素可见
        pageImageState.setIsShow(true);
        // initImage();
        intersectionObserver.unobserve(item.target); // 停止观察当前元素 避免不可见时候再次调用callback函数
      }
    });
  };
  // 绑定事件
  const bingEvent = () => {
    window.addEventListener('resize', resizeEvent);

    let intersectionObserver: any;
    intersectionObserver = new IntersectionObserver(function (entries: any) {
      handler(entries, intersectionObserver);
    });
    let $$pageImage = document.getElementById(`pageImage${props.index}`);
    if ($$pageImage) {
      intersectionObserver.observe($$pageImage);
    }
  };

  useEffect(() => {
    // initImage();
    bingEvent();

    return () => {
      window.removeEventListener('resize', resizeEvent);
    };
  }, []);

  return (
    <div
      id={`pageImage${props.index}`}
      className="page-image"
      style={{ height: pageImageState.imageHeight + 'px' }}
      data-org-width={pageImageState.orgWidth}
      data-org-height={pageImageState.orgHeight}>
      <div
        className="page-image-bg"
        style={{ backgroundImage: `url(${pageImageState.isShow ? props.src : ''})` }}></div>
      <img
        id={`pageImageImg${props.index}`}
        className="page-image-img"
        src={pageImageState.isShow ? props.src : ''}
        alt="haihai"
        width="100%"
        height="100%"
        draggable="true"
        onLoad={() => {
          let $$img: any = document.getElementById('pageImageImg' + props.index);
          if ($$img) {
            pageImageState.setOrgHeight($$img.naturalHeight);
            pageImageState.setOrgWidth($$img.naturalWidth);
            resizeImg();
          }
        }}
      />
    </div>
  );
});
export default PageImage;
