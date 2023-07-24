/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiRequestOptions } from './ApiRequestOptions';
import environment from "~/environment";

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
    ACCESS_TOKEN?: string | Resolver<string>;
    API_KEY?: string | Resolver<string>;
};


export const OpenAPI: OpenAPIConfig = {
    BASE: environment.apiBaseURL,
    VERSION: '1',
    WITH_CREDENTIALS: false,
    CREDENTIALS: 'include',
    TOKEN: undefined,
    API_KEY: environment.xApiToken,
    ACCESS_TOKEN: undefined,
    USERNAME: undefined,
    PASSWORD: undefined,
    HEADERS: {
        'Content-Type': 'application/json',
        'Origin': 'X-Requested-With',

    },
    ENCODE_PATH: (path: string) => {
    // Encode the path using encodeURIComponent
    const encodedPath = encodeURIComponent(path);
    return encodedPath;
},
};
