import React, { useState, useEffect } from 'react';
import Utils from '@/module/utils/Utils';

import './PageImage.style.less';

export interface PageImageProps {
    src: string;
    index: number;
}

/**
 * 图片组件
 * @param props
 */
export default function PageImage(props: PageImageProps) {
    const [imageHeight, setImageHeight] = useState(400);
    const [orgHeight, setOrgHeight] = useState(0);
    const [orgWidth, setOrgWidth] = useState(0);
    let imgIns: any = null;

    // 图片原始比例
    const ratio = () => orgWidth / orgHeight;
    // 自适应图片
    const resizeImg = () => {
        let $$pageImage = document.querySelectorAll('.page-image')[props.index];
        if ($$pageImage) {
            let w = $$pageImage.getClientRects()[0].width;
            setImageHeight(w / ratio());
        }
    };

    // 初始化
    const initImage = () => {
        const img = (imgIns = imgIns || new Image());
        img.onload = function () {
            setOrgHeight(img.height);
            setOrgWidth(img.width);
            resizeImg();
        };

        img.src = props.src;
    };

    let resizeEvent = Utils.debounce(() => {
        resizeImg();
    }, 500);

    // 绑定事件
    const bingEvent = () => {
        window.addEventListener('resize', resizeEvent);
    };

    useEffect(() => {
        initImage();
        bingEvent();

        return () => {
            window.removeEventListener('resize', resizeEvent);
        };
    });

    return (
        <div className="page-image" style={{ height: imageHeight + 'px' }}>
            <div className="page-image-bg" style={{ backgroundImage: `url(${props.src})` }}></div>
            <img className="page-image-img" src={props.src} alt="haihai" width="100%" height="100%" draggable="true" />
        </div>
    );
}
