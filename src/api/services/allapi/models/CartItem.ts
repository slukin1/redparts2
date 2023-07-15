/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SelectedColor } from './SelectedColor';
import type { SelectedSize } from './SelectedSize';

export type CartItem = {
    _id: string;
    product: string;
    selectedColor: SelectedColor;
    selectedSize: SelectedSize;
    totalProductQuantity: number;
    totalProductPrice: number;
};
