/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { commonGetResponse } from '../models/commonGetResponse';
import type { errorResponse } from '../models/errorResponse';
import type { FavoriteResponse } from '../models/FavoriteResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FavoriteService {

    /**
     * get favorite products list API
     * This route allow logged in user/seller/admin to get his favorite products list
     * @returns FavoriteResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static getFavoriteApi({
acceptLanguage,
}: {
/**
 * Accept-Language
 * Example : en_US, jp_JP
 */
acceptLanguage?: string,
}): CancelablePromise<FavoriteResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/favorite',
            query: {
                'accept-language': acceptLanguage,
            },
            errors: {
                400: `400 response`,
                404: `404 response`,
                500: `500 response`,
            },
        });
    }

    /**
     * add product to favorite list API
     * This route allow logged in user/seller/admin to add product to his favorite list
     * @returns commonGetResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static addFavorite({
requestBody,
}: {
requestBody: {
productId: string;
},
}): CancelablePromise<commonGetResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/favorite',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `400 response`,
                404: `404 response`,
                500: `500 response`,
            },
        });
    }

    /**
     * check if product in favorite list API
     * This route allow logged in user/seller/admin to check if product in favorite list
     * @returns commonGetResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static checkFavoriteApi({
id,
acceptLanguage,
}: {
id: string,
/**
 * Accept-Language
 * Example : en_US, jp_JP
 */
acceptLanguage?: string,
}): CancelablePromise<commonGetResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/favorite/check/productId',
            query: {
                'accept-language': acceptLanguage,
                'id': id,
            },
            errors: {
                400: `400 response`,
                404: `404 response`,
                500: `500 response`,
            },
        });
    }

    /**
     * delete product from favorite list API
     * This route allow logged in user/seller/admin to delete product from favorite list
     * @returns commonGetResponse 200 response
     * @throws ApiError
     */
    public static favoriteDelete({
id,
}: {
id: string,
}): CancelablePromise<commonGetResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/favorite/productId',
            query: {
                'id': id,
            },
            errors: {
                404: `404 response`,
                500: `500 response`,
            },
        });
    }

}
