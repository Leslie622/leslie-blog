import axios from 'axios'
import router from '@/router'

// 文本提示
import { Message } from 'element-ui';

// 网络请求进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 默认配置
const defaultConfig = {
  baseURL: "https://zjx.pub:8001/land/",
  timeout: 10 * 1000,
  withCredentials: true
};

//创建axios实例
export function request(config) {
  const instance = axios.create(defaultConfig)

  //请求拦截
  instance.interceptors.request.use(
    config => {
      nprogress.start()
      return config;
    },
    error => {
      return Promise.reject(error)
    });

  //响应拦截
  instance.interceptors.response.use(

    response => {
      if (response.data.code != 200) {
        switch (response.data.code) {
          case 401:
            Message({
              type: 'error',
              message: response.data.msg,
              duration: 1500
            });
            return Promise.reject(response)
          case 404:
            router.push('/page404');
            return Promise.reject(response)
          default:
            Message({
              type: 'error',
              message: response.data.msg,
              duration: 1500
            });
            return Promise.reject(response);
        }
      }
      nprogress.done()
      return response.data;
    },
    error => {
      if (error.response) {
        switch (error.response.status) {
          case 404:
            router.push('/page404');
            break;
          default:
            Message({
              type: 'error',
              message: error.response.data.error.message || '请求失败，请稍后再试',
              duration: 1500
            });
            break;
        }
      }
      return Promise.reject(error);
    });
  return instance(config)
}

export function get(url, params, options) {
  return request({
    method: "get",
    url,
    params,
    ...options
  })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return error
    })
}

export function post(url, params) {
  return request({
    method: "post",
    url,
    params,
  })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return error
    })
}


