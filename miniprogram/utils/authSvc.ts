import customerSvc from '../services/customerSvc';
import tokenUtils from './tokenUtils';
import utils from './util';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, consistent-return

const setToken = async (obj) => {
    const { accessToken, refreshToken } = obj;
    const { tokenString } = refreshToken;
    await tokenUtils.setToken({
        accessToken: accessToken,
        refreshToken: tokenString,
    });
};
const getAccessToken = async () => {
    const pageUrl = utils.getCurrentPageUrl();
    const res = await customerSvc.login();
    if (res.success) {
        setToken(res.data);
        wx.reLaunch({
            url: `/${pageUrl}`,
        });
    } else {
        await tokenUtils.clear();
        throw Error('登录失败');
    }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const refreshToken = async () => {
    const pageUrl = utils.getCurrentPageUrl();
    const token = await tokenUtils.getToken();
    const res = await customerSvc.refreshToken(token);
    if (res.success && res.data) {
        wx.reLaunch({
            url: `/${pageUrl}`,
        });
        setToken(res.data);
    }
    if (!res.success || res.errorCode === 401) {
        await tokenUtils.clear();
        await getAccessToken();
    }
};

export default { refreshToken, getAccessToken };
