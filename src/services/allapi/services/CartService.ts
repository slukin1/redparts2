/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddCartBody } from '../models/AddCartBody';
import type { CartPostResponse } from '../models/CartPostResponse';
import type { CartPutResponse } from '../models/CartPutResponse';
import type { CartsGetResponse } from '../models/CartsGetResponse';
import type { commonPostResponse } from '../models/commonPostResponse';
import type { errorResponse } from '../models/errorResponse';
import type { UpdateCartBody } from '../models/UpdateCartBody';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CartService {

    /**
     * get cart API
     * This route allow logged in user/seller/admin to get his cart
     * @returns CartsGetResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static getCarts({
acceptLanguage,
}: {
/**
 * Accept-Language
 * Example : en_US, jp_JP
 */
acceptLanguage?: string,
}): CancelablePromise<CartsGetResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/cart',
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
     * add items to his cart API
     * This route allow logged in user/seller/admin to add items to his cart
     * @returns CartPostResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static addCart({
requestBody,
}: {
requestBody: AddCartBody,
}): CancelablePromise<CartPostResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/cart',
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
     * delete product from cart API
     * This route allow logged in user/seller/admin to delete cart
     * @returns commonPostResponse 200 response
     * @throws ApiError
     */
    public static deleteCart({
acceptLanguage,
}: {
/**
 * Accept-Language
 * Example : en_US, jp_JP
 */
acceptLanguage?: string,
}): CancelablePromise<commonPostResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/cart',
            query: {
                'accept-language': acceptLanguage,
            },
            errors: {
                404: `404 response`,
                500: `500 response`,
            },
        });
    }

    /**
     * increase product quantity by one  API
     * This route allow logged in user/seller/admin to increase product quantity by one
     * @returns CartPutResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static putCart({
requestBody,
}: {
requestBody: UpdateCartBody,
}): CancelablePromise<CartPutResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/cart/increase-one',
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
     * reduce product quantity by one API
     * This route allow logged in user/seller/admin to reduce product quantity by one
     * @returns CartPutResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static putCartImage({
requestBody,
}: {
requestBody: UpdateCartBody,
}): CancelablePromise<CartPutResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/cartId/reduce-one',
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
     * delete product from cart API
     * This route allow logged in user/seller/admin to delete product from cart
     * @returns commonPostResponse 200 response
     * @throws ApiError
     */
    public static deleteProductCart({
id,
acceptLanguage,
}: {
id: string,
/**
 * Accept-Language
 * Example : en_US, jp_JP
 */
acceptLanguage?: string,
}): CancelablePromise<commonPostResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/cart/productId',
            query: {
                'accept-language': acceptLanguage,
                'id': id,
            },
            errors: {
                404: `404 response`,
                500: `500 response`,
            },
        });
    }

}
