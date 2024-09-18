import type { ArticleData } from '../data-types/article';
import type { IResponseData, IResponseListData } from '../data-types/base';
import request from '../utils/request/request';

const routePrefix = '/article';

const getList = (param: ArticleData.IBasePageQuery) =>
    request.get<IResponseListData<ArticleData.IList>>(
        `${routePrefix}/list?categoryCode=${param.categoryCode}&title=${param.title}&page=${param.page}&rows=${param.rows}`,
    );
const getDetail = (id: string) =>
    request.get<IResponseData<ArticleData.IDetail>>(`${routePrefix}/${id}`);
export default { getList, getDetail };
