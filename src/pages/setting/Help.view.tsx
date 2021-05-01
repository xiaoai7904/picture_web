import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import PageHistory from '@/router/PageHistory';
import './Setting.style.less';

export default function Help() {
  return (
    <div className="help">
      <NavBar mode="light" icon={<Icon type="left" color="#8a8a8a" />} onLeftClick={() => PageHistory.goBack()}>
        帮助说明
      </NavBar>
      <div className="help-content">
        <p>嗨嗨美影社网站，致力于美女影像，努力做成为国内最专业最大的原创美女写真摄影平台。</p>
        {/* <p>合作、意见反馈、商业拍摄等，请联系 haihaicc@gmail.com</p>
        <p>附：网站发展初期，可能还会有一些问题或细节做的不够好、不完善，如果有相关问题欢迎与我们联系沟通。</p>
        <p>客服：17272772 （QQ号），有问题请联系</p> */}
      </div>
    </div>
  );
}
