/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

import type { commonGetResponse } from '../models/commonGetResponse';
import type { errorResponse } from '../models/errorResponse';
import type { FavoriteResponse } from '../models/FavoriteResponse';

import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

@Injectable()
export class FavoriteService {

    constructor(public readonly http: HttpClient) {}

    /**
     * get favorite products list API
     * This route allow logged in user/seller/admin to get his favorite products list
     * @returns FavoriteResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public getFavoriteApi({
acceptLanguage,
}: {
/**
 * Accept-Language
 * Example : en_US, jp_JP
 */
acceptLanguage?: string,
}): Observable<FavoriteResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
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
    public addFavorite({
requestBody,
}: {
requestBody: {
productId: string;
},
}): Observable<commonGetResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
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
    public checkFavoriteApi({
id,
acceptLanguage,
}: {
id: string,
/**
 * Accept-Language
 * Example : en_US, jp_JP
 */
acceptLanguage?: string,
}): Observable<commonGetResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
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
    public favoriteDelete({
id,
}: {
id: string,
}): Observable<commonGetResponse> {
        return __request(OpenAPI, this.http, {
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
