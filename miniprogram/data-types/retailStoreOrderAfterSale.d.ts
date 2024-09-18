import {
    RetailStoreOrderAfterSaleType,
    RetailStoreOrderStatus,
    RetailStoreStatus,
    StoreType,
} from './enum';
import { IBaseView } from './response';

declare namespace RetailStoreOrderAfterSaleData {
    interface IRetailStore {
        id: string;
        name: string;
        shortName: string;
        departmentName: string;
        departmentId: string;
        type: StoreType;
        categoryName: string;
        categoryId: string;
        address: {
            province: string;
            provinceCode: string;
            city: string;
            cityCode: string;
            district: string;
            districtCode: string;
            street: string;
            streetCode: string;
            detail: string;
            longitude: number;
            latitude: number;
        };
        openDate: Date;
        manager: string;
        status: RetailStoreStatus;
        sort: number;
        disabled: boolean;
    }

    interface IRetailStoreOrderAfterSaleItems {
        retailStoreOrderAfterSaleId: string;
        retailStoreOrderItem: {
            id: string;
            orderId: string;
            productSkuProductName: string;
            productSkuProductMainImage: string;
            productSkuId: string;
            quantity: number;
            price: number;
            totalPrice: number;
            totalPaid: number;
            hasAfterSale: true;
        };
        type: RetailStoreOrderAfterSaleType;
        quantity: number;
    }

    interface IApplyAttachments {
        id: string;
        fileName: string;
        fileExtension: string;
        fileUrl: string;
    }

    interface IDetailRes extends IBaseView {
        retailStoreOrder: {
            retailStore: IRetailStore;
            orderTime: Date;
            amount: number;
            paidAmount: number;
            remark: string;
            manager: string;
            status: RetailStoreOrderStatus;
        };
        orderTime: Date;
        amount: number;
        paidAmount: number;
        status: RetailStoreOrderStatus;
        retailStoreOrderAfterSaleItems: IItems[];
        applyTime: Date;
        description: string;
        reviewerName: string;
        reviewerId: string;
        reviewTime: Date;
        approved: boolean;
        reviewOpinion: string;
        handlerName: string;
        handlerId: string;
        handleTime: Date;
        applyAttachments: IApplyAttachments[];
        handleAttachments: IApplyAttachments[];
    }

    interface IListRes extends IBaseView {
        retailStoreOrder: {
            retailStore: IRetailStore;
            orderTime: Date;
            amount: number;
            paidAmount: number;
            status: RetailStoreOrderStatus;
        };
        status: RetailStoreStatus;
        applyTime: Date;
    }

    interface IItems {
        retailStoreOrderAfterSaleId: string;
        retailStoreOrderItem: {
            id: string;
            orderId: string;
            productSkuProductName: string;
            productSkuProductMainImage: {
                id: string;
                fileName: string;
                fileExtension: string;
                fileUrl: string;
            };
            productSkuId: string;
            quantity: number;
            price: number;
            totalPrice: number;
            totalPaid: number;
            hasAfterSale: true;
        };
        type: RetailStoreOrderAfterSaleType;
        quantity: number;
    }

    interface ISaveReq extends IBaseView {
        id: string;
        retailStoreOrderId: string;
        retailStoreOrderItems: IItems[];
        description: string;
        applyAttachmentIds: string[];
    }
}
