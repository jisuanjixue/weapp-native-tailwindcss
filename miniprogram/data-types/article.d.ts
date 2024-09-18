import { IBaseView } from './base';

declare namespace ArticleData {
    interface IList extends IBaseView {
        title: string;
        postTime: Date;
        summary: string;
        linkUrl: string;
        mainImage: {
            id: string;
            fileName: string;
            fileExtension: string;
            fileUrl: string;
        };
        sort: number;
    }

    interface IBasePageQuery {
        page?: number;
        rows?: number;
        categoryCode?: string;
        title?: string;
    }

    interface IDetail extends IBaseView {
        title: string;
        categoryName: string;
        postTime: Date;
        summary: string;
        linkUrl: string;
        mainImage: {
            id: string;
            fileName: string;
            fileExtension: string;
            fileUrl: string;
        };
        mainImageId: string;
        content: string;
        sort: number;
    }
}
