import type { IResponseData } from '../data-types/base';
import request from '../utils/request/request';

const routePrefix = '/Captcha';
interface params {
    phone: string;
}

const sendCode = (params: params) => {
    console.log('🚀 ~ sendCode ~ params:', params);
    return request.post<IResponseData<any>, any>(
        `${routePrefix}/send-sms-code`,
        params,
    );
};

export default { sendCode };
