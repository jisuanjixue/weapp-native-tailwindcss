import { DataDictionaryCategoryData } from '../data-types/dataDictionaryCategory';
import { IResponseListData } from '../data-types/response';
import request from '../utils/request/request';

const routePrefix = '/dataDictionaryCategory';

const getLists = () =>
    request.get<IResponseListData<DataDictionaryCategoryData.IItemsView>>(
        `${routePrefix}/select-list`,
    );

export default { getLists };
