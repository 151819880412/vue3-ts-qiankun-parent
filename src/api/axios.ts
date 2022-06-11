import axios, { AxiosRequestConfig, Method } from 'axios';
import { ElLoading, ElMessage } from 'element-plus';
// import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type';
import Store from '@/store';



// 定义接口 
interface PendingType {
  url?: string;
  method?: Method;
  params: any;
  data: any;
  cancel: Function;
}

// 取消重复请求
const pending: Array<PendingType> = [];
const CancelToken = axios.CancelToken;
// axios 实例
const instance = axios.create({
  timeout: 30000,
  responseType: 'json'
});
let loadingInstance: any;
// let loadingInstance: ILoadingInstance;

// 移除重复请求
const removePending = (config: AxiosRequestConfig) => {
  for (const key in pending) {
    const item: number = +key;
    const list: PendingType = pending[key];
    // 当前请求在数组中存在时执行函数体
    if (list.url === config.url && list.method === config.method && JSON.stringify(list.params) === JSON.stringify(config.params) && JSON.stringify(list.data) === JSON.stringify(config.data)) {
      // 执行取消操作
      list.cancel('操作太频繁，请稍后再试');
      // 从数组中移除记录
      pending.splice(item, 1);
    }
  }
};

// 添加请求拦截器
instance.interceptors.request.use((config: AxiosRequestConfig) => {
  let token = localStorage.getItem('token')||'';
  let refreshToken = localStorage.getItem('refreshToken')||'';
  config.headers!.Authorization = token;  // token  !表示强制解析  类型推断排除null、undefined
  config.headers!.refreshToken = refreshToken;  // token
  loadingInstance = ElLoading.service(Store.state.loading);

  removePending(config);
  config.cancelToken = new CancelToken((c) => {
    pending.push({ url: config.url, method: config.method, params: config.params, data: config.data, cancel: c });
  });
  // const {method, data} = config
  // const method: any = config;
  // const data: any = config;
  // console.log(method);
  // if (method.toLowerCase() === 'post') {
  //   config.paramsSerializer = function (params) { // 如果是get请求，且params是数组类型如arr=[1,2]，则转换成arr=1&arr=2
  //     return qs.stringify(params, { arrayFormat: 'repeat' });
  //   };
  // } else if (method.toLowerCase() === 'get') { // 如果是get请求，且params是数组类型如arr=[1,2]，则转换成arr=1&arr=2
  //   config.paramsSerializer = function (params) {
  //     return qs.stringify(params, { arrayFormat: 'repeat' });
  //   };
  // }

  return config;
},
  error => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    loadingInstance.close();
    removePending(response.config);

    const code = response?.data?.code;
    switch (code) {
      case '20001':
        ElMessage(response?.data?.message);
        break;
      case 10000:
        ElMessage.error(response.data.message);
        break;
      default:
        break;
    }

    return response.data;
  },
  error => {
    loadingInstance.close();
    const response = error.response;

    // 根据返回的http状态码做不同的处理
    switch (response?.status) {
      case 401:
        // token失效
        break;
      case 403:
        // 没有权限
        break;
      case 500:
        // 服务端错误
        break;
      case 503:
        // 服务端错误
        break;
      default:
        break;
    }

    // 超时重新请求
    const config = error.config;
    // 全局的请求次数,请求的间隙
    const [RETRY_COUNT, RETRY_DELAY] = [3, 1000];

    if (config && RETRY_COUNT) {
      // 设置用于跟踪重试计数的变量
      config.__retryCount = config.__retryCount || 0;
      // 检查是否已经把重试的总数用完
      if (config.__retryCount >= RETRY_COUNT) {
        return Promise.reject(response || { message: error.message });
      }
      // 增加重试计数
      config.__retryCount++;
      // 创造新的Promise来处理指数后退
      const backoff = new Promise((resolve) => {
        setTimeout(() => {
          resolve(1);
        }, RETRY_DELAY || 1);
      });
      // instance重试请求的Promise
      return backoff.then(() => {
        return instance(config);
      });
    }

    // eslint-disable-next-line
    return Promise.reject(response || { message: error.message });
  }
);

export default instance;