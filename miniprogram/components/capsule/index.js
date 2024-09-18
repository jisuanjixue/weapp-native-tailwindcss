import validator from '../../behaviors/validator';

import deviceUtil from '../../utils/device-util';
import eventUtil from '../../utils/event-util';

Component({
    options: {
        multipleSlots: true,
    },
    behaviors: [validator],
    externalClasses: ['l-title-class'],
    properties: {
        // 胶囊栏颜色
        bgColor: {
            type: String,
            value: 'white',
        },
        // 状态栏颜色
        statusBarColor: {
            type: String,
            value: 'transparent',
        },
        // 标题栏颜色
        titleBarColor: {
            type: String,
            value: 'transparent',
        },
        // 标题颜色
        titleColor: {
            type: String,
            value: 'black',
        },
        // 胶囊按钮颜色
        capsuleColor: {
            type: String,
            value: 'black',
            options: ['white', 'black'],
        },
        // 禁用左侧按钮返回上一页
        disableBack: {
            type: Boolean,
            value: false,
        },
        // 禁用右侧按钮返回主页
        disableHome: {
            type: Boolean,
            value: false,
        },
        // 隐藏胶囊按钮
        hiddenCapsule: {
            type: Boolean,
            value: false,
        },
        // 主页路径
        homePage: {
            type: String,
            value: '',
        },
        // 页面标题
        title: {
            type: String,
            value: '',
        },
        // 顶部填充
        hasPadding: {
            type: Boolean,
            value: true,
        },
        // 隐藏标题
        hiddenTitle: {
            type: Boolean,
            value: false,
        },
        // 左侧胶囊按钮左侧图标路径
        capsuleLeftIconPath: {
            type: String,
            value: null,
        },
        // 左侧胶囊按钮左侧图标宽度，单位：rpx
        capsuleLeftIconWidth: {
            type: Number,
            value: null,
        },
        // 左侧胶囊按钮左侧图标高度，单位：rpx
        capsuleLeftIconHeight: {
            type: Number,
            value: null,
        },
        // 左侧胶囊按钮右侧图标路径
        capsuleRightIconPath: {
            type: String,
            value: null,
        },
        // 左侧胶囊按钮右侧图标宽度，单位：rpx
        capsuleRightIconWidth: {
            type: Number,
            value: null,
        },
        // 左侧胶囊按钮右侧图标高度，单位：rpx
        capsuleRightIconHeight: {
            type: Number,
            value: null,
        },
    },

    data: {
        // 标题栏高度（单位px）
        titleBarHeight: deviceUtil.getTitleBarHeight(),
        // 状态栏高度（单位px）
        statusBarHeight: deviceUtil.getStatusBarHeight(),
        // 左侧胶囊按钮信息
        capsuleButtonInfo: null,
        capsuleButtonInfo: null,
    },

    lifetimes: {
        ready: function () {
            const pages = getCurrentPages();
            const currentPage = pages[pages.length - 1];
            const pageUrl = currentPage.route;
            console.log("🚀 ~ pageUrl:", pageUrl)
            this.setData({
                capsuleButtonInfo: this.getCapsuleButtonInfo(),
                hideCapsuleLeftIcon: pageUrl === 'packageB/pages/inviteJoin/inviteJoin'? false : true,
            });
        },
    },

    methods: {
        /**
         * 获取左侧胶囊按钮信息
         */
        getCapsuleButtonInfo() {
            const { screenWidth } = wx.getSystemInfoSync();
            const capsuleButtonInfo = wx.getMenuButtonBoundingClientRect();
            capsuleButtonInfo.left = screenWidth - capsuleButtonInfo.right;
            capsuleButtonInfo.right =
                capsuleButtonInfo.left + capsuleButtonInfo.width;
            return capsuleButtonInfo;
        },

        /**
         * 监听：点击左侧按钮
         */
        onTapLeftButton() {
            eventUtil.emit(this, 'linlefttap');
            const pages = getCurrentPages();
            const currentPage = pages[pages.length - 1];
            const pageUrl = currentPage.route;
            if (!this.data.disableBack) {
                wx.showNavigationBarLoading({
                    success() {
                        if (
                            pageUrl === 'packageB/pages/inviteJoin/inviteJoin'
                        ) {
                            wx.navigateBack({
                                success() {
                                    const page = getCurrentPages().pop();
                                    if (page == undefined || page == null)
                                        return;
                                    page.onLoad();
                                },
                            });
                        }
                        wx.navigateBack({
                            success() {
                                wx.hideNavigationBarLoading();
                            },
                        });
                    },
                });
            }
        },

        /**
         * 监听：长按左侧按钮
         */
        onLongPressLeftButton() {
            eventUtil.emit(this, 'linleftlongpress');
        },

        /**
         * 监听：点击右侧按钮
         */
        async onTapRightButton() {
            eventUtil.emit(this, 'linrighttap');
            const pages = getCurrentPages();
            const currentPage = pages[pages.length - 1];
            const pageUrl = currentPage.route;
            const { homePage } = this.data;
            if (!this.data.disableHome) {
                if (pageUrl === 'packageB/pages/inviteJoin/inviteJoin') {
                    wx.reLaunch({
                        url: homePage,
                        success() {
                            const page = getCurrentPages().pop();
                            if (page == undefined || page == null) return;
                            page.onLoad();
                        },

                        fail() {
                            wx.navigateTo({
                                url: homePage,
                            });
                        },
                    });
                } else {
                    wx.switchTab({
                        url: homePage,
                        fail() {
                            wx.navigateTo({
                                url: homePage,
                            });
                        },
                    });
                }
            }
        },

        /**
         * 监听：长按右侧按钮
         */
        onLongPressRightButton() {
            eventUtil.emit(this, 'linrightlongpress');
        },
    },
});
