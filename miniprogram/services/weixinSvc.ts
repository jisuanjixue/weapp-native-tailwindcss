import type { IResponseListData } from '../data-types/base';
import type WeixinData from '../data-types/weixin';
import request from '../utils/request/request';

const routePrefix = '/wexin';

const decryptData = (data: WeixinData.IDecryptDataRequest) =>
    request.post(`${routePrefix}/decrypt-data`, data);

const getMessageTemplates = () =>
    request.get<IResponseListData<string>>(`${routePrefix}/message-templates`);

export default { decryptData, getMessageTemplates };
