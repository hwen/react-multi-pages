import axios from 'axios';
import { alert } from 'src/utils/toast';
import { trackRequest } from 'src/utils/analysis';

const iAlert = mes => alert({ title: '请求错误', message: mes });

// 创建 request 实例
const ax = axios.create({
  baseURL: '',
  timeout: 5000, // 请求超时时间
});

// request拦截器
ax.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

export const errHandler = err => {
  if (err.message || err.mes || err.info) {
    iAlert(err.message || err.mes || err.info);
  } else {
    iAlert(JSON.stringify(err));
  }
};

export const get = (url, config) => {
  return ax
    .get(url, config)
    .then(res => {
      if (!res.data || res.data.status != 0) {
        errHandler(res.data);
      }
      if (res.data.status == 0) res.data.isOk = true;
      return res.data;
    })
    .catch(err => {
      errHandler(err);
      trackRequest('err', JSON.stringify(err));
      throw err;
    });
};

export const post = (url, data, config) => {
  return ax
    .post(url, data, config)
    .then(res => {
      if (!res.data || res.data.status != 0) {
        errHandler(res.data);
      }
      if (res.data.status == 0) res.data.isOk = true;
      return res.data;
    })
    .catch(err => {
      errHandler(err);
      trackRequest('err', JSON.stringify(err));
      throw err;
    });
};
