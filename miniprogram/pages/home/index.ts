import {
    effect,
    signal,
} from '@preact/signals-core';

import articleSvc from '../../services/articleSvc';
import indexBannerSvc from '../../services/indexBannerSvc';

import { userBehavior } from '../../stores/behavior';

import dayUtil from '../../utils/dayjsUtils';
import deviceUtil from '../../utils/device-util';
import host from '../../utils/request/apiConfig';

const bannerList = signal([]);
const articleHome = signal([]);
const showIndicator = signal(false);
const bannerHeight = signal(150);

Page({
    /**
     * 页面的初始数据
     */
    data: {
        Hei: 0,
    },
    behaviors: [userBehavior],

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        // this.getDictionaryCategory();
        this.queryBannerList();
        this.homeArticleList();
    },

    onBannerImageLoad(e) {
        const winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
        const imgH = e.detail.height; //图片高度
        const imgW = e.detail.width;
        const swiperH = (winWid * imgH) / imgW; //等比设置swiper的高度。  即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度    ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
        this.setData({
            Hei: swiperH, //设置高度
            imageWidth: winWid,
        });
    },

    queryBannerList: async () => {
        try {
            const res = await indexBannerSvc.getList();
            if (res.success) {
                const list = res?.data;
                bannerList.value = list?.map((v) => ({
                    ...v,
                    preview: `${host.file}/upload/${v?.preview?.fileUrl}`,
                }));
            } else {
                bannerList.value = [];
            }
        } catch (error) {
            wx.showToast({
                title: `${error}`,
                icon: 'none',
                duration: 2000,
            });
        }
    },

    homeArticleList: async () => {
        const params = {
            page: 1,
            rows: 4,
            categoryCode: '1',
            title: '',
        };
        try {
            const res = await articleSvc.getList(params);
            if (res.success) {
                const demo = [
                    {
                        id: '11',
                        mainImage: {
                            id: '1',
                            fileName: '测试',
                            fileExtension: '.png',
                            fileUrl: 'http://cdn.skyvow.cn/logo.png',
                        },
                        title: '在社区开展公益活动1',
                        postTime: '2024-08-13T02:26:34.290Z',
                        summary:
                            '社区公益义卖，汇聚爱心，传递温暖,共建美好社区。社区公益义卖，汇聚爱心，传递温暖,共建美好社区。社区公益义卖，汇聚爱心，传递温暖,共建美好社区。',
                    },
                    {
                        id: '22',
                        mainImage: {
                            id: '2',
                            fileName: '测试',
                            fileExtension: '.png',
                            fileUrl: 'http://cdn.skyvow.cn/logo.png',
                        },
                        title: '在社区开展公益活动2',
                        postTime: '2024-08-13T02:26:34.290Z',
                        summary:
                            '社区公益义卖，汇聚爱心，传递温暖,共建美好社区。社区公益义卖，汇聚爱心，传递温暖,共建美好社区。社区公益义卖，汇聚爱心，传递温暖,共建美好社区。',
                    },
                    {
                        id: '33',
                        mainImage: {
                            id: '3',
                            fileName: '测试',
                            fileExtension: '.png',
                            fileUrl: 'http://cdn.skyvow.cn/logo.png',
                        },
                        title: '在社区开展公益活动3',
                        postTime: '2024-08-13T02:26:34.290Z',
                        summary:
                            '社区公益义卖，汇聚爱心，传递温暖,共建美好社区。社区公益义卖，汇聚爱心，传递温暖,共建美好社区。社区公益义卖，汇聚爱心，传递温暖,共建美好社区。',
                    },
                ];
                const list = demo?.map((v) => ({
                    ...v,
                    mainImage: `${host.api.baseUrl}/upload${v?.mainImage}`,
                    postTime: dayUtil.formatDateTime(v?.postTime),
                }));
                articleHome.value = list;
            } else {
                articleHome.value = [];
            }
        } catch (error) {
            wx.showToast({
                title: `${error}`,
                icon: 'none',
                duration: 2000,
            });
        }
    },

    onContentClick(e) {
        const { id } = e.currentTarget.dataset;
        wx.navigateTo({
            url: `/packageB/pages/articleDetail/articleDetail?id=${id}`,
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},

    onBannerClick(e: any) {
        const sourceId = e.currentTarget.dataset.sourceid;
        const { source } = e.currentTarget.dataset;
        const url = () =>
            (() => {
                if (source === '文章') return '/packageB/pages/article/article';
                if (source === '促销活动')
                    return '/packageB/pages/negativeDetail/index';
                return '/pages/home/index';
            })();
        wx.navigateTo({
            url: `${url()}?id=${sourceId}`,
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        const deviceBarHeight = Math.ceil(deviceUtil.getNavigationBarHeight());
        effect(() => {
            this.setData({
                active: showIndicator.value,
                articleHome: articleHome.value,
                bannerList: bannerList.value,
                showIndicator: bannerList.value.length > 1 ? true : false,
                bannerHeight: bannerHeight.value,
                deviceBarHeight: deviceBarHeight,
                isPC: ['mac', 'windows'].includes(wx.getDeviceInfo().platform),
            });
        });
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

    lookMore() {
        wx.navigateTo({
            url: '/packageB/pages/article/article',
        });
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {},
});
