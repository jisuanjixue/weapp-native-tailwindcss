/// <reference path="./types/index.d.ts" />

interface IAppOption {
    globalData: {
        // eslint-disable-next-line no-undef
        userInfo?: any;
        themeVars?: any;
        wx?: any;
        isConnected?: boolean;
    };
    // eslint-disable-next-line no-undef
    userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback;
}
