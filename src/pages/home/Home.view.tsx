import React from 'react';
import { Tabs } from 'antd-mobile';

export default function HomeView() {
  const tabs = [
    { title: 'First Tab'  },
    { title: 'Second Tab' },
    { title: 'Third Tab' },
  ];
  return (
    <Tabs tabs={tabs} initialPage={1}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '150px',
          backgroundColor: '#fff',
        }}>
        Content of first tab
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '150px',
          backgroundColor: '#fff',
        }}>
        Content of second tab
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '150px',
          backgroundColor: '#fff',
        }}>
        Content of third tab
      </div>
    </Tabs>
  );
}
