import {
    ProductStatus,
    RetailStoreSettlementStatus,
    RetailStoreStatus,
    StoreType,
} from './enum';
import { IBaseView } from './response';

declare namespace RetailStoreSettlementData {
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

    interface IListRes extends IBaseView {
        retailStoreId: string;
        beginDate: Date;
        endDate: Date;
        receivableAmount: number;
        receivedAmount: number;
        status: RetailStoreSettlementStatus;
    }

    interface IValues {
        id: string;
        value: string;
        propertyName: string;
        propertyId: string;
    }

    interface ISkus {
        id: string;
        productName: string;
        productMainImage: string;
        values: IValues[];
    }

    interface IIValues {
        id: string;
        value: string;
    }
    interface ISkuProperties {
        propertyName: string;
        propertyId: string;
        values: IIValues[];
    }

    interface IVValues {
        id: string;
        property: {
            id: string;
            categoryId: string;
            name: string;
            enableInChildren: boolean;
            values: string[];
        };
        propertyId: string;
        value: string;
    }

    interface IItems {
        id: string;
        orderId: string;
        productSku: {
            id: string;
            product: {
                id: string;
                name: string;
                mainImage: string;
                sort: number;
                skus: ISkus[];
                skuProperties: ISkuProperties[];
                manySku: boolean;
                shoppingCartAmount: number;
            };
            values: IVValues[];
            code: string;
            purchasePrice: number;
            orderPrice: number;
            stockQuantity: number;
            unit: string;
            status: ProductStatus;
            shoppingCartAmount: number;
        };
        productSkuId: string;
        quantity: number;
        price: number;
        totalPrice: number;
        totalPaid: number;
        hasAfterSale: boolean;
    }

    interface IDeliveryAttachments {
        id: string;
        fileName: string;
        fileExtension: string;
        fileUrl: string;
    }

    interface IDetailRes extends IBaseView {
        id: string;
        retailStore: IRetailStore;
        orderTime: Date;
        amount: number;
        paidAmount: number;
        status: RetailStoreSettlementStatus;
        freight: number;
        remark: string;
        items: IItems[];
        deliveryManName: string;
        deliveryManId: string;
        deliveredTime: Date;
        reviewerName: string;
        reviewerId: string;
        reviewTime: Date;
        approved: boolean;
        reviewOpinion: string;
        deliveryAttachments: IDeliveryAttachments[];
    }

    interface IOrderListRes extends IBaseView {
        retailStore: IRetailStore;
        orderTime: Date;
        amount: number;
        paidAmount: number;
        status: RetailStoreSettlementStatus;
    }
}
