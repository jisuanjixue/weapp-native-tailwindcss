export interface IBaseView {
    id: string | undefined;
}

export interface IResponse {
    success: boolean;
    errorCode: number;
    errorMessage: string | undefined;
}

export interface IResponseData<T> extends IResponse {
    data: T | undefined;
    total: number | undefined;
}

export interface IResponseListData<T> extends IResponseData<T[]> {}

export interface ISelectListItem {
    value: any;
    text: string;
}

export interface ITreeNode<T> {
    item: T;
    children: T[];
}

export enum FilterType {
    Equal = 0,
    Contains = 1,
    StartsWith = 2,
    EndsWith = 3,
    Composite = 4,
    NotEqual = 5,
    GreaterThan = 6,
    LessThanOrEqual = 7,
    GreaterThanOrEqual = 8,
    LessThan = 9,
    In = 10,
    NotIn = 11,
}
export interface IFilter {
    and?: boolean;
    type: FilterType;
}

export interface ISorter {
    path: string;
    ascending: boolean;
}

export interface IBasePageQuery {
    page?: number;
    pageSize?: number;
    filters?: IFilter[];
    sorts?: ISorter[];
}
