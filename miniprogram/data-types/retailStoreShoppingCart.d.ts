import { ProductStatus } from './enum';
import { IBaseView } from './response';

declare namespace retailStoreShoppingCartData {
    interface Values {
        id: string;
        property: string;
        value: string;
    }
    interface Skus {
        id: string;
        product: string;
        values: Values;
        code: string;
        purchasePrice: number;
        retailPrice: number;
        franchiseePrice: number;
        stockQuantity: number;
        unit: string;
        status: ProductStatus;
    }
    interface SkuProperties {
        id: string;
        category: {
            id: string;
            name: string;
            sort: number;
        };
        name: string;
        enableInChildren: boolean;
        values: string[];
    }

    interface IListRes extends IBaseView {
        productSku: {
            id: string;
            subTotal: number;
            goodSubTotal: number;
            alreadyGood: number;
            name: string;
            mainImage: string;
            intro: string;
            sort: number;
            skus: string[];
            skuProperties: SkuProperties[];
            manySku: boolean;
            values: [
                {
                    id: string;
                    property: {
                        id: string;
                        category: {
                            id: string;
                            name: string;
                            sort: number;
                        };
                        name: string;
                        enableInChildren: true;
                        values: string[];
                    };
                    value: string;
                },
            ];
            code: string;
            purchasePrice: number;
            retailPrice: number;
            franchiseePrice: number;
            stockQuantity: number;
            unit: string;
            status: ProductStatus;
        };
        productSkuId: string;
        amount: number;
    }

    interface ISaveReq {
        productSkuId: string;
        amount: number;
    }
}
