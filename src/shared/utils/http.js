import axios from 'axios';
import qs from 'qs';
import { Dialog } from 'vant';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.timeout = 2000;
const errorMessage = {
    404: '请求出错(404)',
    500: '服务器错误(500)',
    504: '网络超时(504)'
};
/* 请求拦截器 */
axios.interceptors.request.use(config => {
    return config;
}, error => {
    return Promise.reject(error);
});

/* 响应拦截器 */
axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error && error.response) {
        /* 错误统一处理 */
        handleHttpError(error);
    } else {
        Dialog.alert({ message: '连接服务器失败' });
    }
    return Promise.reject(error.response);
});

/**
 * http统一错误处理
 * @param  {} error 错误信息
 */
function handleHttpError (error) {
    Dialog.alert({
        title: error.message,
        message: errorMessage[error.response.status],
        confirmButtonColor: '#ffcd32',
        confirmButtonText: '确认'
    });
}

export function get (url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params
        }).then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error);
        });
    });
}
export function post (url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(params, {
            arrayFormat: 'brackets'
        })).then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error);
        });
    });
}
export function all (requestArr) {
    return new Promise((resolve, reject) => {
        axios.all(requestArr).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}