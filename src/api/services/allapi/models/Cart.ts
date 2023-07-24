/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CartItem } from './CartItem';

export type Cart = {
    email: string;
    items: Array<CartItem>;
    totalQuantity: number;
    totalPrice: number;
};
