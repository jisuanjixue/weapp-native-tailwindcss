import type {
    IBasePageQuery,
    IResponseData,
    IResponseListData,
} from '../data-types/base';
import type { RetailStoreOrderAfterSaleData } from '../data-types/retailStoreOrderAfterSale';
import request from '../utils/request/request';

const routePrefix = '/RetailStoreOrderAfterSale';

const getList = (param: IBasePageQuery) =>
    request.post<
        IResponseListData<RetailStoreOrderAfterSaleData.IListRes>,
        any
    >(`${routePrefix}/query`, param);

const getDetail = (id: string) =>
    request.get<IResponseData<RetailStoreOrderAfterSaleData.IDetailRes>>(
        `${routePrefix}/${id}`,
    );

const save = (params: RetailStoreOrderAfterSaleData.ISaveReq) =>
    request.post(`${routePrefix}/save`, params);

export default { getList, getDetail, save };
