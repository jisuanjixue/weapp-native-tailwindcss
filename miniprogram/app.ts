import type UserData from './data-types/user';
import authInterceptors from './utils/request/authInterceptors';
import errorHandlerInterceptor from './utils/request/errorHandlerInterceptor';
import request from './utils/request/request';
import requestUrlInterceptor from './utils/request/requestUrlInterceptor';
import utils from './utils/util';

//  创建一个事件总线实例

// eslint-disable-next-line no-undef
App<IAppOption>({
    globalData: {
        //全局数据管理
        userInfo: {} as UserData.ICurrentInfo,
        isConnected: true,
    },

    onLaunch() {
        request.interceptors.useRequest(
            requestUrlInterceptor,
            authInterceptors.request,
        );
        request.interceptors.useResponse(authInterceptors.response);
        request.interceptors.useResponse(
            errorHandlerInterceptor,
            authInterceptors.response,
        );

        const g =
            utils.isType(window, 'undefined') && window?.Math === Math
                ? window
                : utils.isType(global, 'object')
                  ? global
                  : this;
        /** The way lodash gets the global object is not applicable in WeChat applet, fix as follows */
        if (!g?.Object) {
            g.Object = Object;
        }
        if (!g?.Date) {
            g.Date = Date;
        }

        // Customize the finally of the promis to prevent errors under the applet ios
        if (!Promise.prototype.finally) {
            Promise.prototype.finally = function (callback) {
                const P = this.constructor;
                return this.then(
                    (value) => P.resolve(callback()).then(() => value),
                    (reason) =>
                        P.resolve(callback()).then(() => {
                            throw reason;
                        }),
                );
            };
        }
        /* Version auto-update code */
        const updateManager = wx.getUpdateManager();
        updateManager.onCheckForUpdate((res) => {
            if (res.hasUpdate) {
                updateManager.onUpdateReady(() => {
                    wx.showModal({
                        title: '您有新的版本！', // Here you can customize the prompt title
                        content: '检测到新版本，是否重启小程序？', // Here you can customize the content of the prompt message
                        success: (resData) => {
                            if (resData.confirm) {
                                // The new version has been downloaded, call applyUpdate to apply the new version and restart
                                updateManager.applyUpdate();
                            }
                        },
                    });
                });
            }
            // Callback after requesting new version information true indicates that there is an update
        });
        updateManager.onUpdateFailed(() => {
            // 新的版本下载失败
            wx.showModal({
                title: '更新提示',
                content: '新版本下载失败',
                showCancel: false,
            });
        });

        /**
         * 初次加载判断网络情况
         * 无网络状态下根据实际情况进行调整
         */
        wx.getNetworkType({
            success: (res) => {
                const { networkType } = res;
                if (networkType === 'none') {
                    this.globalData.isConnected = false;
                    wx.showToast({
                        title: '当前无网络',
                        icon: 'loading',
                        duration: 2000,
                    });
                }
            },
        });
        /**
         * 监听网络状态变化
         * 可根据业务需求进行调整
         */
        wx.onNetworkStatusChange((res) => {
            if (!res.isConnected) {
                this.globalData.isConnected = false;
                wx.showToast({
                    title: '网络已断开',
                    icon: 'loading',
                    duration: 2000,
                });
            } else {
                this.globalData.isConnected = true;
                wx.hideToast();
            }
        });
    },
});
