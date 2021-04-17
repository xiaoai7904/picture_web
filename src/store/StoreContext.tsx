import React from 'react';
import { GlobalStore } from './globalStore/globalStore';


export const StoresContext = React.createContext({
  globalStore: new GlobalStore(),
});

export const useGlobalStore = () => React.useContext(StoresContext);
