import MD5 from 'js-md5';

export default class Utils {
  static md5 = (word: any) => MD5(word);
  static throttle = (fn: () => void, ms: number) => {
    let startTime = 0;

    return () => {
      if (Date.now() - startTime > ms) {
        fn();
        startTime = Date.now();
      }
    };
  };
  static debounce = (fn: (...arg: any[]) => void, ms: number) => {
    let timer: any = null;

    return (...arg: any[]) => {
      timer && clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...arg);
      }, ms);
    };
  };
  static deepClone = (data: any): any => {
    if (Array.isArray(data)) {
      return data.map(Utils.deepClone);
    } else if (data && typeof data === 'object') {
      let cloneData: any = {};
      for (let i in data) {
        cloneData[i] = Utils.deepClone(data[i]);
      }
      return cloneData;
    } else {
      return data;
    }
  };
}
