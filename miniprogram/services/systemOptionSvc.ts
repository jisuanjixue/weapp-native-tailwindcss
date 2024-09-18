// import Taro from "@tarojs/taro";
import type { IResponseData, IResponseListData } from '../data-types/base';
import type SystemOptionData from '../data-types/systemOption';
import request from '../utils/request/request';

const routePrefix = '/systemOption';

const getAttachmentSample = async () => {
    return await request.get<IResponseData<SystemOptionData.IAttachmentSample>>(
        `${routePrefix}/retail-store-register-attachment-sample-config`,
    );
};

const getMessageTemplates = () =>
    request.get<IResponseListData<string>>(`${routePrefix}/get-template-ids`);

export default {
    getAttachmentSample,
    getMessageTemplates,
};
