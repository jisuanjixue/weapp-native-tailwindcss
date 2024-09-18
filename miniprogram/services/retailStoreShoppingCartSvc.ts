import type { IResponseData, IResponseListData } from '../data-types/base';
import type { retailStoreShoppingCartData } from '../data-types/retailStoreShoppingCart';
import request from '../utils/request/request';

const routePrefix = '/RetailStoreShoppingCart';

const getList = () =>
    request.get<IResponseListData<retailStoreShoppingCartData.IListRes>>(
        `${routePrefix}/list`,
    );

const getAmount = (productSkuId: string) =>
    request.get<IResponseListData<retailStoreShoppingCartData.IListRes>>(
        `${routePrefix}/${productSkuId}/amount`,
    );
const save = (params: retailStoreShoppingCartData.ISaveReq) =>
    request.post<IResponseData<retailStoreShoppingCartData.IListRes>, any>(
        `${routePrefix}/save`,
        params,
    );
const fillByOrder = (orderId: string) =>
    request.post<IResponseData<retailStoreShoppingCartData.IListRes>, any>(
        `${routePrefix}/fill-by-order/${orderId}`,
    );

const delShoppingCart = (productSkuId: string) =>
    request.delete(`${routePrefix}/${productSkuId}`);

const clearShoppingCart = () => request.delete(`${routePrefix}/clear`);

export default {
    getList,
    save,
    getAmount,
    fillByOrder,
    delShoppingCart,
    clearShoppingCart,
};
