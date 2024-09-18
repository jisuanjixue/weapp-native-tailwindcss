import type { IResponseListData } from '../data-types/base';
import type { ProductData } from '../data-types/product';
import request from '../utils/request/request';

const routePrefix = '/ProductSku';

const getByValues = (param: ProductData.ISaveSkuValues) =>
    request.post<IResponseListData<ProductData.IListByValuesRes>, any>(
        `${routePrefix}/get-by-values`,
        param,
    );

export default { getByValues };
