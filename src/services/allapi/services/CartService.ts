/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

import type { AddCartBody } from '../models/AddCartBody';
import type { CartPostResponse } from '../models/CartPostResponse';
import type { CartPutResponse } from '../models/CartPutResponse';
import type { CartsGetResponse } from '../models/CartsGetResponse';
import type { commonPostResponse } from '../models/commonPostResponse';
import type { errorResponse } from '../models/errorResponse';
import type { UpdateCartBody } from '../models/UpdateCartBody';

import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

@Injectable()
export class CartService {

    constructor(public readonly http: HttpClient) {}

    /**
     * get cart API
     * This route allow logged in user/seller/admin to get his cart
     * @returns CartsGetResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public getCarts({
acceptLanguage,
}: {
/**
 * Accept-Language
 * Example : en_US, jp_JP
 */
acceptLanguage?: string,
}): Observable<CartsGetResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
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
    public addCart({
requestBody,
}: {
requestBody: AddCartBody,
}): Observable<CartPostResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
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
    public deleteCart({
acceptLanguage,
}: {
/**
 * Accept-Language
 * Example : en_US, jp_JP
 */
acceptLanguage?: string,
}): Observable<commonPostResponse> {
        return __request(OpenAPI, this.http, {
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
    public putCart({
requestBody,
}: {
requestBody: UpdateCartBody,
}): Observable<CartPutResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
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
    public putCartImage({
requestBody,
}: {
requestBody: UpdateCartBody,
}): Observable<CartPutResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
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
    public deleteProductCart({
id,
acceptLanguage,
}: {
id: string,
/**
 * Accept-Language
 * Example : en_US, jp_JP
 */
acceptLanguage?: string,
}): Observable<commonPostResponse> {
        return __request(OpenAPI, this.http, {
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
