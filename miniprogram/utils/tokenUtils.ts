// import type UserData from '../data-types/user';

// eslint-disable-next-line no-undef
const keyToken = 'token';
const keyToEncrypted = 'encrypted';
const keyToIsRegistering = 'isRegistering';

interface ISaveToken {
    accessToken: string;
    refreshToken: string;
}
interface ISaveEncrypted {
    iv: string;
    encryptedData: string;
}
type TToken = ISaveToken;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const setToken = (token: TToken) => {
    wx.setStorageSync(keyToken, token);
};
const setIsRegistering = (isRegistering: string | undefined) => {
    wx.setStorageSync(keyToIsRegistering, isRegistering);
};
const setEncrypted = (encrypted: ISaveEncrypted) => {
    wx.setStorageSync(keyToEncrypted, encrypted);
};

const getEncrypted = () => {
    try {
        return wx.getStorageSync(keyToEncrypted);
    } catch (e) {
        return undefined;
    }
};
// eslint-disable-next-line consistent-return
const getToken = () => {
    try {
        return wx.getStorageSync(keyToken);
    } catch (e) {
        return undefined;
    }
};
const getIsRegistering = () => {
    try {
        return wx.getStorageSync(keyToIsRegistering);
    } catch (e) {
        return undefined;
    }
};
const isAuthorized = (): boolean => {
    const token = getToken();
    return token ? true : false;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const clear = () => {
    wx.clearStorageSync();
};

export default {
    setToken,
    getToken,
    clear,
    isAuthorized,
    getEncrypted,
    setEncrypted,
    getIsRegistering,
    setIsRegistering
};
