/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { commonPostResponse } from './commonPostResponse';
import type { putOrderResponseData } from './putOrderResponseData';

export type OrderPutResponse = (commonPostResponse & putOrderResponseData);
