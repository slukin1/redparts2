/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import environment from '~/enviroment';
import type { ApiRequestOptions } from './ApiRequestOptions';

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;
type Headers = Record<string, string>;

export type OpenAPIConfig = {
    BASE: string;
    VERSION: string;
    WITH_CREDENTIALS: boolean;
    CREDENTIALS: 'include' | 'omit' | 'same-origin';
    TOKEN?: string | Resolver<string>;
    USERNAME?: string | Resolver<string>;
    PASSWORD?: string | Resolver<string>;
    HEADERS?: Headers | Resolver<Headers>;
    ENCODE_PATH?: (path: string) => string;
};

export const OpenAPI: OpenAPIConfig = {
    BASE: environment.apiBaseURL , 
    VERSION: '1',
    WITH_CREDENTIALS: false,
    CREDENTIALS: 'include',
    // is converted to base64 and HEADERS{Authorization} in request.ts
    TOKEN: environment.bearerAuth,  
    // is converted to base64 and HEADERS{Authorization} in request.ts
    USERNAME: environment.username,
    PASSWORD: environment.password,
    HEADERS: {
        'Content-Type': 'application/json',
        'Authorization': ``, // add token or refresh token from from response only
    },
    ENCODE_PATH: (path: string) => {
        // Encode the path using encodeURIComponent
        const encodedPath = encodeURIComponent(path);
        return encodedPath;
    },
};
