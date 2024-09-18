import { TResponseInterceptor } from './core';

const errorHandlerInterceptor: TResponseInterceptor = async (response) => {
    const { statusCode } = response;
    let errMessage = '';
    switch (statusCode) {
        case 400:
            errMessage = '请求错误(400)';
            break;
        // case 401:
        //     errMessage = '您还没加盟登录，请先加盟登录！';
        //     break;
        case 403:
            errMessage = '拒绝访问(403)';
            break;
        case 404:
            errMessage = '请求出错(404)';
            break;
        case 408:
            errMessage = '请求超时(408)';
            break;
        case 500:
            errMessage = '服务器错误(500)';
            break;
        case 501:
            errMessage = '服务未实现(501)';
            break;
        case 502:
            errMessage = '网络错误(502)';
            break;
        case 503:
            errMessage = '服务不可用(503)';
            break;
        case 504:
            errMessage = '网络超时(504)';
            break;
        case 505:
            errMessage = 'HTTP版本不受支持(505)';
            break;
        default:
            errMessage =
                statusCode !== 401
                    ? `请求出错: ${response.errMsg}，状态码：(${response.statusCode})!`
                    : '';
    }

    // 如果http响应状态码response.statusCode
    if ((statusCode >= 200 && statusCode <= 300) || statusCode === 304) {
    } else {
        // statusCode不正常的
        wx.showToast({
            title: `${errMessage}`,
            icon: 'none',
            duration: 2000,
        });
    }
    return response;
};

export default errorHandlerInterceptor;
