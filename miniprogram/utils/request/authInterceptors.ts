import authSvc from '../authSvc';
import tokenUtils from '../tokenUtils';
import { TRequestInterceptor, TResponse, TResponseInterceptor } from './core';
import request from './request';

// import Dialog from '@vant/weapp/dialog/dialog';

const requestInterceptor: TRequestInterceptor = (url, options) => {
    const token = tokenUtils.getToken();

    const { header = {} } = options;
    const headerAuth: Record<string, string> = {};

    headerAuth['Authorization'] = `bearer ${token?.accessToken || ''}`;

    return {
        url,
        options: {
            ...options,
            header: { ...header, ...headerAuth },
            interceptors: true,
        },
    };
};

let isRefreshToken = false;
let retryCount = 0;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// let requestUrl = false;
let subscribers: (() => void)[] = [];

const responseInterceptor: TResponseInterceptor = async (res, url, options) => {
    // const pages = getCurrentPages();
    // const currentPage = pages[pages.length - 1];
    // const pageUrl = currentPage.route;

    if (res.statusCode !== 401) {
        return res;
    } else {
        // if (!(await tokenUtils.isAuthorized()) && pageUrl !== 'pages/home/index' && !requestUrl) {
        //     requestUrl = true;
        //     Dialog.confirm({
        //         title: '加盟',
        //         message: '您还没加盟登录，请先加盟登录！',
        //     })
        //         .then(() => {
        //             wx.navigateTo({
        //                 url: `/packageB/pages/inviteJoin/inviteJoin`,
        //                 success(){
        //                     requestUrl = false;
        //                 }
        //             });
        //         })
        //         .catch(() => {
        //             wx.switchTab({
        //                 url: `/pages/home/index`,
        //                 success(){
        //                     requestUrl = false;
        //                 }
        //             });
        //         });

        // }
        if (retryCount >= 3) {
            retryCount = 0;
            return res;
        }

        const retry = new Promise<TResponse>((resolve) => {
            subscribers.push(() => resolve(request(url, options)));
        });

        if (!isRefreshToken && (await tokenUtils.isAuthorized())) {
            isRefreshToken = true;
            try {
                await authSvc.refreshToken();
            } catch (e) {
                console.error(e);
                retryCount += 1;
            }

            isRefreshToken = false;
            subscribers.forEach((cb) => cb());
            subscribers = [];
        }

        return retry;
    }
};

export default { request: requestInterceptor, response: responseInterceptor };
