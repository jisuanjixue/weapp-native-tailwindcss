import { IBaseView } from './base';
import { RetailStoreSettlementPaymentMethod } from './enum';

declare namespace StatisticsData {
    interface ICurrentMonth extends IBaseView {
        total: number;
        yesterday: number;
    }

    interface IItems {
        productName: string;
        productId: string;
        productTotal: number;
    }
    interface IPayments {
        settlementId: string;
        paymentTime: Date;
        paymentMethod: RetailStoreSettlementPaymentMethod;
        amount: number;
    }

    interface IMonth extends IBaseView {
        total: number;
        receivedAmount: number;
        items: IItems[];
        payments: IPayments[];
    }
    interface IYear extends IBaseView {
        yearTotal: number;
        total: number;
        months: number[];
        monthTotals: number[];
    }
    interface IToday extends IBaseView {
        total: number;
        coupon: number;
        order: number;
    }
}
