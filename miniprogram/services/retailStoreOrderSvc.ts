import type {
    IBasePageQuery,
    IResponseData,
    IResponseListData,
} from '../data-types/base';
import type { RetailStoreOrderData } from '../data-types/retailStoreOrder';
import request from '../utils/request/request';

const routePrefix = '/RetailStoreOrder';

const getList = (param: IBasePageQuery) =>
    request.post<IResponseListData<RetailStoreOrderData.IListRes>, any>(
        `${routePrefix}/query`,
        param,
    );

const getDetail = (id: string) =>
    request.get<IResponseData<RetailStoreOrderData.IDetailRes>>(
        `${routePrefix}/${id}`,
    );

const save = (data: RetailStoreOrderData.ISaveData) =>
    request.post<IResponseData<any>, any>(`${routePrefix}/save`, data);
const cancel = (id: string) =>
    request.post<IResponseData<any>, any>(`${routePrefix}/cancel?id=${id}`);

const getCurrentOrderList = (year: number, month: number) =>
    request.get<IResponseListData<RetailStoreOrderData.IOrderListRes>>(
        `${routePrefix}/list?year=${year}&month=${month}`,
    );

export default { getList, getDetail, save, getCurrentOrderList, cancel };
