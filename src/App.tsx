import React from 'react';
import { useGlobalStore } from '@/store/StoreContext';
import { observer } from 'mobx-react';
import RouterApp from '@/router/Router';
import '@/style/system.less';

const App = observer(() => {
  const { globalStore } = useGlobalStore();

  return <RouterApp />
});

export default App;
