import type {
    IBasePageQuery,
    IResponseData,
    IResponseListData,
} from '../data-types/base';
import type { ProductData } from '../data-types/product';
import request from '../utils/request/request';

const routePrefix = '/Product';

const getList = (param: IBasePageQuery) =>
    request.post<IResponseListData<ProductData.IListRes>, any>(
        `${routePrefix}/company/query`,
        param,
    );

const getDetail = (id: string) =>
    request.get<IResponseData<ProductData.IDetailRes>>(
        `${routePrefix}/company/detail/${id}`,
    );

export default { getList, getDetail };
