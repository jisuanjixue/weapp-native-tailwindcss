import baseComponent from '../../behaviors/baseComponent';
import WeixinData from '../../data-types/weixin';

import customerSvc from '../../services/customerSvc';

import dayUtil from '../../utils/dayjsUtils';
import eventBus from '../../utils/event-bus';
import tokenUtils from '../../utils/tokenUtils';

// import util from '../../utils/util';

baseComponent({
    /**
     * 组件的属性列表
     */
    properties: {
        showAction: Boolean,
    },

    data: {
        loadingP: false,
        bindStore: {},
        show: false,
        showLogin: false,
        desc: '',
        // isRegistering: ( () => {
        //     console.log(util.isType(tokenUtils.getIsRegistering(), 'undefined')?  true : tokenUtils.getIsRegistering() === '1' ? true : false, tokenUtils.getIsRegistering())
        //     return  !tokenUtils.getIsRegistering()? true : tokenUtils.getIsRegistering() === '1' ? true : false;
        // })(),
    },

    lifetimes: {
        created() {
          this.getDetail()
        },
    },

    /**
     * 组件的方法列表
     */
    methods: {
        async login() {
            const res1: any = await customerSvc.login();
            if (res1.success) {
                const { accessToken, refreshToken } = res1.data;
                const { tokenString } = refreshToken;
                await tokenUtils.setToken({
                    accessToken: accessToken,
                    refreshToken: tokenString,
                });
                eventBus.emit('refreshUser', '加盟成功');
                wx.reLaunch({
                    url: '/pages/user/index',
                    success: () => {
                        wx.showToast({
                            title: '您已加盟登录成功！',
                            icon: 'none',
                            duration: 5000,
                        });
                        const page = getCurrentPages().pop();
                        if (page == undefined || page == null) return;
                        page.onLoad();
                    },
                });
            } else {
                await tokenUtils.clear();
                throw Error('登录失败');
            }
        },
        async getDetail() {
            try {
                const result = await wx.login();
                const res = await customerSvc.registerDetail(result.code);
                if(!(await tokenUtils.isAuthorized())) {
                    if (res.errorCode === 301 && !res.success) {
                        this.setData({
                            showLogin: true,
                            desc: '您已加盟请点击登录',
                        });
                    } else {
                        this.setData({
                            showLogin: false,
                            desc: '请选择您的操作',
                        });
                    }
                }
              
            } catch (error) {
                wx.showToast({
                    title: `${error}`,
                    icon: 'none',
                    duration: 2000,
                });
            }
        },
        async getDecryptedData(encryptedData: WeixinData.IDecryptDataRequest) {
            this.setData({
                loadingP: true,
            });
            const result = await wx.login();
            await tokenUtils.setEncrypted({
                iv: encryptedData.iv,
                encryptedData: encryptedData.encryptedData,
            });
            const saveData = {
                iv: encryptedData.iv,
                encryptedData: encryptedData.encryptedData,
                code: result.code || '',
                confirm: false,
            };
            try {
                const res: any = await customerSvc.bindByPhone(saveData);
                if (res.success) {
                    const { data } = res;
                    this.setData({
                        bindStore: {
                            id: data?.id,
                            departmentName: data?.departmentName,
                            name: data?.name,
                            openDate: dayUtil.formatDateTime(data?.openDate),
                            manager: data?.manager,
                            status: data?.status,
                            address: `${data?.address?.province || ''}${data?.address?.city || ''}${data?.address?.district || ''}${data?.address?.detail || ''}`,
                        },
                        loadingP: false,
                        show: true,
                    });
                }
                if (res.errorCode === 600) {
                    this.setData({
                        loadingP: false,
                    });
                    wx.showToast({
                        title: `${res.errorMessage}`,
                        icon: 'none',
                        duration: 5000,
                    });
                }
            } catch (error) {
                this.setData({
                    loadingP: false,
                });
                wx.showToast({
                    title: `${error}`,
                    icon: 'none',
                    duration: 2000,
                });
            }
        },

        async bindCurrentStore() {
            const result = await wx.login();
            const encryptedData = await tokenUtils.getEncrypted();
            const saveData = {
                iv: encryptedData.iv,
                encryptedData: encryptedData.encryptedData,
                code: result.code || '',
                confirm: true,
            };
            try {
                const res: any = await customerSvc.bindByPhone(saveData);
                if (res.success) {
                    this.triggerEvent('onActionClose');
                    this.setData({
                        show: false,
                    });
                    const res1: any = await customerSvc.login();
                    if (res1.success) {
                        const { accessToken, refreshToken } = res1.data;
                        const { tokenString } = refreshToken;
                        await tokenUtils.setToken({
                            accessToken: accessToken,
                            refreshToken: tokenString,
                        });
                        await tokenUtils.setIsRegistering('0');
                        eventBus.emit('refreshUser', '加盟成功');
                        wx.switchTab({
                            url: '/pages/user/index',
                            success: () => {
                                wx.showToast({
                                    title: '您已加盟登录成功！',
                                    icon: 'none',
                                    duration: 5000,
                                });
                                const page = getCurrentPages().pop();
                                if (page == undefined || page == null) return;
                                page.onLoad();
                            },
                        });
                    } else {
                        await tokenUtils.clear();
                        throw Error('登录失败');
                    }
                    wx.showToast({
                        title: `绑定成功！`,
                        icon: 'success',
                        duration: 2000,
                    });
                }
                if (res.errorCode === 600) {
                    this.setData({
                        loadingP: false,
                    });
                    wx.showToast({
                        title: `${res.errorMessage}`,
                        icon: 'none',
                        duration: 5000,
                    });
                }
            } catch (error) {
                this.setData({
                    loadingP: false,
                });
                wx.showToast({
                    title: `${error}`,
                    icon: 'none',
                    duration: 2000,
                });
            }
        },

        onActionClose() {
            this.triggerEvent('onActionClose');
        },

        onClose() {
            this.setData({
                show: false,
            });
        },

        handLogin() {
            wx.reLaunch({
                url: `/packageB/pages/inviteJoin/inviteJoin`,
            });
        },

        getPhone(event: any) {
            if (event.detail.errMsg.indexOf(':ok') === -1) {
                wx.showToast({
                    title: '拒绝申请，无法获取电话号码',
                    icon: 'none',
                    duration: 2000,
                });
                return;
            }
            this.getDecryptedData(event.detail);
        },
    },
});
