import axios from 'axios';
import { AxiosInstance } from 'axios';
const apiUrl = 'http://172.18.10.91/web/'
import { Toast } from 'vant';
let toast;
function createAPI({ url, headers } : any) {
  const instance = axios.create({
    headers,
    baseURL: `${url}`,
    timeout: 60000,
  });

  instance.interceptors.request.use(
    (request: any): any => {
      toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...',
      });
      if (request.method === 'get') {
        request.headers.common['Pragma'] = 'no-cache';
        request.headers.common['Cache-control'] = 'no-cache';
      }
      return request;
    },
    (errorData: any): any => {
      return Promise.reject(errorData);
    },
  );

  instance.interceptors.response.use(
    (response: any): any => {
      Toast.clear()
      return response;
    },
    (errorData: any): any => {
      Toast.clear()
      return Promise.reject(errorData?.response || {});
    },
  );

  return instance;
}

export const apiCreator: (headers?: any) => AxiosInstance = (headers) => {
  return createAPI({
    url: apiUrl,
    headers: { ...headers},
  });
};

