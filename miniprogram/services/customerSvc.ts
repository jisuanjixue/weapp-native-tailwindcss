// import Taro from "@tarojs/taro";
import type { IResponseData } from '../data-types/base';
import type UserData from '../data-types/user';
import request from '../utils/request/request';

const routePrefix = '/retailStore';

const login = async () => {
    const result = await wx.login();
    return await request.get<IResponseData<UserData.IToken>>(
        `${routePrefix}/login?code=${result.code || ''}`,
    );
};

const _refreshToken = (token: UserData.IToken | undefined) =>
    request.post<IResponseData<UserData.IToken>, any>(
        `${routePrefix}/refresh-token`,
        token,
    );

const register = (data: UserData.ISave | undefined) =>
    request.post<IResponseData<any>, any>(`${routePrefix}/register`, data);

const registerDetail = (code: string) =>
    request.get<IResponseData<UserData.TDetail>>(
        `${routePrefix}/register-detail?code=${code}`,
    );

const modifyPhone = (data: UserData.IPhoneRequest | undefined) =>
    request.post(`${routePrefix}/modify-phone`, data);

const editProfile = (data: UserData.IProfileRequest | undefined) =>
    request.post(`${routePrefix}/profile`, data);
const getProfile = () =>
    request.get<IResponseData<UserData.IProfileRes>>(`${routePrefix}/profile`);

const getCurrentUser = async () => {
    return await request.get<IResponseData<UserData.ICurrentInfo>>(
        `${routePrefix}/current`,
    );
};
const bindByPhone = async (data: UserData.IBindByPhoneRequest | undefined) => {
    return await request.post(`${routePrefix}/bind-by-phone`, data);
};

export default {
    login,
    refreshToken: _refreshToken,
    getCurrentUser,
    register,
    modifyPhone,
    editProfile,
    getProfile,
    registerDetail,
    bindByPhone,
};
