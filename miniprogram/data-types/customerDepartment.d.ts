import { IBaseView } from './base';

declare namespace CustomerDepartmentData {
    interface ITreeItem extends IBaseView {
        name: string;
        parentId?: string;
        children: ITreeItem[];
    }
}

export default CustomerDepartmentData;
