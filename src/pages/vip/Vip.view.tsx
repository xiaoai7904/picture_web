import React, { useEffect, useState } from 'react';
import Http from '@/module/http/Http';
import SystemConfig from '@/module/systemConfig/SystemConfig';
import './Vip.style.less'

export default function Vip() {
  const [vipHtml, setVipHtml] = useState('')
  const getVipConfig = () => {
    Http.of()
    ?.post(SystemConfig.configRecharge, {})
    .then((data: any) => {
        console.log(data)
        setVipHtml(data.data.data.detail.remark)
    })
  }
  useEffect(() => {
    getVipConfig()
  }, [])
  return <div className="w-e-text-container" dangerouslySetInnerHTML={{ __html: `<div class="w-e-text">${vipHtml}</div>`}}></div>;
}
