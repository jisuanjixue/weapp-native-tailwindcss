import type { IResponseListData, ITreeNode } from '../data-types/base';
import type CustomerDepartmentData from '../data-types/customerDepartment';
import request from '../utils/request/request';

const routePrefix = '/department';

const getTree = (customerId: string | undefined) =>
    request.get<IResponseListData<ITreeNode<CustomerDepartmentData.ITreeItem>>>(
        `${routePrefix}/tree?customerId=${customerId || ''}`,
    );

export default { getTree };
