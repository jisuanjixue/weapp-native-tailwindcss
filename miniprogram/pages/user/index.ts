// index.ts
import Dialog from '@vant/weapp/dist/dialog/dialog';

import {
    batch,
    effect,
    signal,
} from '@preact/signals-core';

import captchaSvc from '../../services/captchaSvc';
import customerSvc from '../../services/customerSvc';

import { userBehavior } from '../../stores/behavior';

import CountDown from '../../utils/countdown';
import deviceUtil from '../../utils/device-util.js';
import eventBus from '../../utils/event-bus';
import tokenUtils from '../../utils/tokenUtils';
import util from '../../utils/util';

const show = signal(false);
const phoneForm = signal({
    smsCode: null,
    phone: null,
});
const codeReceivedTime = signal(null);
const version = signal('');
const user = signal({});
// 获取应用实例

Page({
    data: {
        user: {},
        smsCodeRules: [
            {
                required: true,
                message: '请输入验证码',
                trigger: ['blur', 'change'],
            },
        ],
        phoneNumberRules: [
            {
                required: true,
                message: '请输入联系电话',
                trigger: ['blur', 'change'],
            },
            {
                validator(
                    _,
                    value: string,
                    callback: (params?: boolean) => void,
                ) {
                    if (!util.isValidChinesePhoneNumber(value.toString())) {
                        callback(false);
                    } else {
                        callback();
                    }
                },
                message: '您填写的手机号错误！',
                trigger: 'change',
            },
        ],
    },
    behaviors: tokenUtils.isAuthorized() ? [userBehavior] : [],
    onLoad() {
        if (tokenUtils.isAuthorized()) {
            this.getCurrentUser();
        }
        (async () => {
            if((await tokenUtils.getIsRegistering() === '1' || !(await tokenUtils.getIsRegistering())) && !(await tokenUtils.isAuthorized())) {
                this.setData({
                    showAction: true,
                });
            } else {
                if(await tokenUtils.getIsRegistering() === '0' && !(await tokenUtils.isAuthorized())) {
                    wx.reLaunch({
                        url: `/packageB/pages/inviteJoin/inviteJoin`,
                    });
                    this.setData({
                        showAction: false,
                    });
                }
                if(await tokenUtils.getIsRegistering() === '0' && await tokenUtils.isAuthorized()) {
                    this.setData({
                        showAction: false,
                    });
                }
            }
        })();
        eventBus.on('refreshUser', () => {
            this.getUser();
        });
        wx.lin.initValidateForm(this);
        const countInfo = wx.getAccountInfoSync();
        version.value = countInfo.miniProgram.version;
    },

    onActionClose() {
        this.setData({
            showAction: false,
        });
        wx.reLaunch({
            url: `/pages/home/index`,
            fail() {
                wx.navigateTo({
                    url: `/pages/home/index`,
                });
            },
        });
    },

    getCurrentUser: async () => {
        try {
            const res = await customerSvc.getCurrentUser();
            if (res.success) {
                if (!res.data?.id && tokenUtils.isAuthorized()) {
                    Dialog.confirm({
                        title: '您还没加盟成功！',
                        message: '是否重新加盟',
                    })
                        .then(() => {
                            wx.redirectTo({
                                url: `/packageB/pages/inviteJoin/inviteJoin`,
                            });
                        })
                        .catch(() => {
                            wx.switchTab({
                                url: `/pages/user/index`,
                            });
                        });
                }
                user.value = {
                    ...res.data,
                    shortAddress: `${res.data?.address?.street || ''}${res.data?.address?.detail || ''}`,
                    addressText: `${res.data?.address.city || ''}${res.data?.address?.district || ''}${res.data?.address?.street || ''}${res.data?.address?.detail || ''}`,
                };
            } else {
                user.value = {};
            }
        } catch (error) {
            wx.showToast({
                title: `${error}`,
                icon: 'none',
                duration: 2000,
            });
        }
    },

    onShare() {
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline'],
        });
    },

    onShareTimeline() {
        return {
            title: `申请加盟`,
            query: `/packageB/pages/inviteJoin/inviteJoin`,
            imageUrl: '../../assets/images/share.png',
        };
    },

    editPhone() {
        show.value = true;
    },

    editCellPhone() {
        show.value = true;
    },

    onClose() {
        show.value = false;
    },
    onConfirm() {},

    async submit(e: any) {
        const { values, isValidate } = e.detail;

        if (!isValidate) {
            wx.showToast({
                title: '您有必填项没填',
                icon: 'none',
                duration: 2000,
            });
            show.value = true;
            return;
        }

        wx.showLoading({
            title: '提交中...',
        });

        await util.delay();

        try {
            const res = await customerSvc.modifyPhone(values);
            wx.hideLoading();
            if (res.success || res.errorCode === 201) {
                wx.showToast({
                    title: res.errorMessage || '修改成功',
                    icon: 'none',
                    mask: true,
                });
                await util.delay(2000);
                show.value = false;
                this.getUser();
                batch(() => {
                    phoneForm.value = {
                        smsCode: null,
                        phone: null,
                    };
                });
                return;
            }

            throw Error(res.errorMessage);
        } catch (error) {
            wx.showToast({
                title: `${error}`,
                icon: 'none',
                duration: 2000,
            });
        }
    },

    async sendCode() {
        try {
            const data = { phone: phoneForm.value.phone };
            const res: any = await captchaSvc.sendCode(data);
            codeReceivedTime.value = Date.now();
            if (res.success) {
                wx.showToast({
                    title: '获取成功！',
                    icon: 'success',
                });
            } else {
                wx.showToast({
                    title: '次数过多!请稍后再试',
                    icon: 'none',
                });
                return;
            }
        } catch (error) {
            wx.showToast({
                title: `${error}`,
                icon: 'none',
                duration: 2000,
            });
        }
    },

    send() {
        if (this.c2 && this.c2.interval) return !1;
        this.sendCode();
        this.c2 = new CountDown({
            date: +new Date() + 60000,
            onEnd() {
                this.setData({
                    c2: '重新获取',
                });
            },
            render(date) {
                const sec = this.leadingZeros(date.sec, 2) + ' 秒 ';
                date.sec !== 0 &&
                    this.setData({
                        c2: sec,
                    });
            },
        });
    },

    onValueChange(e) {
        const now = Date.now();
        const threeMinutesAgo = now - 3 * 60 * 1000;
        const name = e.currentTarget.id;
        if (name === 'smsCode') {
            phoneForm.value[name] = e.detail;
            if (
                !codeReceivedTime.value ||
                codeReceivedTime.value < threeMinutesAgo
            ) {
                wx.showToast({
                    title: '此验证码已无效，请重新发送验证码',
                    icon: 'none',
                    duration: 2000,
                });
            } else {
                phoneForm.value[name] = e.detail;
            }
        }
        phoneForm.value[name] = e.detail;
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage(res) {
        const promise = new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    title: `申请加盟`,
                    path: `/packageB/pages/inviteJoin/inviteJoin`,
                    imageUrl: '../../assets/images/share.png',
                });
            }, 2000);
        });
        if (res.from === 'button') {
            return {
                title: `申请加盟`,
                path: `/packageB/pages/inviteJoin/inviteJoin`,
                imageUrl: '../../assets/images/share.png',
                success: () => {
                    wx.showToast({
                        title: '分享成功！',
                        icon: 'success',
                        duration: 2000,
                    });
                },
                promise,
            };
        } else if (res.from === 'menu') {
            return '';
        }
    },

    onShow() {
        effect(() => {
            this.setData({
                show: show.value,
                phoneForm: phoneForm.value,
                isSubmitValidate: true,
                version: version.value,
                user: user.value,
                capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
                isPC: ['mac', 'windows'].includes(wx.getDeviceInfo().platform),
            });
        });
    },

    onUnload() {
        // Unsubscribe from the refresh signal
        eventBus.off('refreshUser');
    },
});
