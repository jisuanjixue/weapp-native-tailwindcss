import type { IResponseListData } from '../data-types/base';
import type { ProductCategoryData } from '../data-types/productCategory';
import request from '../utils/request/request';

const routePrefix = '/ProductCategory';

const getTypeList = (name?: string) =>
    request.get<IResponseListData<ProductCategoryData.ISelectList>>(
        `${routePrefix}/select-list?name=${name ?? ''}`,
    );
export default { getTypeList };
