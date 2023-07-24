/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { commonPostResponse } from './commonPostResponse';
import type { Tokens } from './Tokens';

export type TokenPostResponse = (commonPostResponse & {
tokens: Tokens;
});
