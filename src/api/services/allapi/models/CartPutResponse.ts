/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CartUdateResponse } from './CartUdateResponse';
import type { commonPostResponse } from './commonPostResponse';

export type CartPutResponse = (commonPostResponse & CartUdateResponse);
