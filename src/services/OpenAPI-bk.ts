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
    TOKEN: environment.bearerAuth,
    USERNAME: environment.username,
    PASSWORD: environment.password,
    HEADERS: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${environment.username}:${environment.password}`).toString('base64')}`,
    },
    ENCODE_PATH: (path: string) => {
        // Encode the path using encodeURIComponent
        const encodedPath = encodeURIComponent(path);
        return encodedPath;
    },
};
