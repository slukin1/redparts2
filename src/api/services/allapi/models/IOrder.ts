/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Address } from './Address';
import type { OrderProductData } from './OrderProductData';
import type { OrderStatus } from './OrderStatus';
import type { UserData } from './UserData';

export type IOrder = {
    _id: string;
    orderNumber: number;
    user: UserData;
    products: Array<OrderProductData>;
    shippingAddress: Address;
    billingAddress?: Address;
    totalPrice: number;
    isPaid: boolean;
    isDelivered: boolean;
    taxPrice: number;
    shippingPrice: number;
    status: OrderStatus;
    paidAt: string;
    deliveredAt?: string;
    paymentMethod: string;
    paymentStripeId?: string;
    paymentPayaplId?: string;
    updatedAt: string;
    createdAt: string;
    phone: string;
    email: string;
    message: string;
};
