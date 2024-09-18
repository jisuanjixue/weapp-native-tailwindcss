import type {
    IBasePageQuery,
    IResponseData,
    IResponseListData,
} from '../data-types/base';
import type { RetailStoreSettlementData } from '../data-types/retailStoreSettlement';
import request from '../utils/request/request';

const routePrefix = '/RetailStoreSettlement';

const getList = (param: IBasePageQuery) =>
    request.post<
        IResponseListData<RetailStoreSettlementData.IQueryListRes>,
        any
    >(`${routePrefix}/query`, param);

const getDetail = (id: string) =>
    request.get<IResponseData<RetailStoreSettlementData.IDetailRes>>(
        `${routePrefix}/${id}`,
    );

const save = (remark: string) =>
    request.post(`${routePrefix}/save`, { remark: remark || '' });

const getCurrentList = (year: number) =>
    request.get<IResponseListData<RetailStoreSettlementData.IListRes>>(
        `${routePrefix}/list?year=${year}`,
    );

export default { getList, getDetail, save, getCurrentList };
