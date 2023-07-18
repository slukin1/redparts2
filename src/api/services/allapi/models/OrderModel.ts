/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderStatus } from './OrderStatus';
import type { UserData } from './UserData';

export type OrderModel = {
    user?: UserData;
    productId: string;
    totalPrice: number;
    isPaid: boolean;
    isDelivered: boolean;
    taxPrice: number;
    shippingPrice: number;
    destinationPort?: string;
    originPort?: string;
    preExportInspectionFee?: string;
    marineInsuranceFee?: string;
    status: OrderStatus;
    paidAt?: string;
    paymentMethod?: string;
    paymentStripeId?: string;
    paymentPayaplId?: string;
    createdAt: string;
    phone: string;
    email: string;
    message: string;
    trackingUrl: string;
    address: string;
};
