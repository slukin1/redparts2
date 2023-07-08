/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OneOrderParam } from './OneOrderParam';
import type { OrderStatus } from './OrderStatus';

export type OrderStatusPutRequest = (OneOrderParam & {
status: OrderStatus;
});
