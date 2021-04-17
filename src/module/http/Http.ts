/**
 * 请求工具
 */
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import PageHistory from '@/router/PageHistory';
import mock from '@/module/mock/mock.module';
import { Toast } from 'antd-mobile';
// let isExpired = false;
let httpIns: Http;
export default class Http {
  $http: AxiosInstance | any;
  constructor() {
    this.$http = axios.create({});
    this.init();
  }
  init() {
    this._defaultsConfig();
    this._interceptRequest();
    this._interceptResponse();
  }
  _defaultsConfig() {
    // this.$http.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
    // this.$http.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest';
    this.$http.defaults.responseType = 'json';
    this.$http.defaults.validateStatus = function () {
      return true;
    };
  }
  _interceptRequest() {
    this.$http.interceptors.request.use(
      (config: any) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.token = token; //请求头加上token
        }
        return config;
      },
      (error: any) => Promise.reject(error)
    );
  }
  _interceptResponse() {
    this.$http.interceptors.response.use(
      (response: any) => {
        if (response.status === 200 && response.data && response.data.code === 0) {
          return Promise.resolve(response);
        }
        if (response.data && response.data.code === 10003) {
          Toast.fail('登录已过期');
          // PageHistory.replace('/login');
          return Promise.reject(response);
        }

        if (response.data && response.data.code) {
          Toast.fail(response.data.msg);
          return Promise.reject(response);
        }
        if (response.data && response.data.status) {
          Toast.fail('数据获取失败');
        }
        if (!response.data) {
          Toast.fail('数据获取失败');
        }
        Toast.fail('数据获取失败');
        return Promise.reject(response);
      },
      (error: any) => {
        Toast.fail('数据获取失败');
        return Promise.reject(error);
      }
    );
  }
  get<T = any, R = AxiosResponse<T>>(url: string, params: any) {
    if ((window as any).environment === 'dev') {
      return mock(url);
    }
    return this.$http.get(url, params);
  }
  post<T = any, R = AxiosResponse<T>>(url: string, params: any) {
    if ((window as any).environment === 'dev') {
      return mock(url);
    }
    return this.$http.post(url, params);
  }

  static of() {
    if (httpIns) return httpIns;
    httpIns = new Http();
    return httpIns;
  }
}
