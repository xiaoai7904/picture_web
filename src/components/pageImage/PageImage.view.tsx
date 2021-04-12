import React, { useState, useEffect } from 'react';
import Utils from '@/module/utils/Utils';

import './PageImage.style.less';

export interface PageImageProps {
    src: string
}

/**
 * 图片组件
 * @param props 
 */
export default function PageImage(props: PageImageProps) {
    const [imageHeight, setImageHeight] = useState(400)

    let imgIns: any = null
    let orgHeight = 0
    let orgWidht = 0

    // 图片原始比例
    const ratio = () => orgWidht / orgHeight
    // 自适应图片
    const resizeImg = () => {
        let $$pageImage = document.querySelector('.page-image')
        if ($$pageImage) {
            let w = $$pageImage.getClientRects()[0].width
            setImageHeight(w / ratio())
        }
    }

    // 初始化
    const initImage = () => {
        const img = imgIns = imgIns || new Image()
        img.onload = function () {
            orgHeight = img.height
            orgWidht = img.width
            resizeImg()
        }

        img.src = props.src
    }

    // 绑定事件 
    const bingEvent = () => {
        window.onresize = Utils.debounce(function () {
            resizeImg()
        }, 500)
    }

    useEffect(() => {
        initImage()
        bingEvent()
    }, [])

    return <div className="page-image" style={{ height: imageHeight + 'px' }}>
        <div className="page-image-bg" style={{ backgroundImage: `url(${props.src})` }}></div>
        <img className="page-image-img" src={props.src} alt="haihai" width="100%" height="100%" draggable="true" />
    </div>
}