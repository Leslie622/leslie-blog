import axios from 'axios'

//element提示框
import { Message } from 'element-ui';

// 网络请求进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

//默认配置 https://2cy.pub:8001/land
const defaultConfig = {
  baseURL: "https://2cy.pub:8001/land/",
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
      nprogress.done()
      return response.data.data;
    },
    error => {
      return Promise.reject(error);
    });

  return instance(config)
}

