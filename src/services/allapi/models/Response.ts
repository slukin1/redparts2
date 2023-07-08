/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AuthResult } from './AuthResult';
import type { Tokens } from './Tokens';

export type Response = {
    user: AuthResult;
    tokens: Tokens;
};
