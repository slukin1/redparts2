/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

import type { AddProductResponse } from '../models/AddProductResponse';
import type { errorResponse } from '../models/errorResponse';
import type { ProductDeleteViewModel } from '../models/ProductDeleteViewModel';
import type { ProductImageUrl } from '../models/ProductImageUrl';
import type { ProductModel } from '../models/ProductModel';
import type { ProductPutRequest } from '../models/ProductPutRequest';
import type { ProductPutResponse } from '../models/ProductPutResponse';
import type { ProductResponse } from '../models/ProductResponse';
import type { UpdateImagesResponse } from '../models/UpdateImagesResponse';

import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

@Injectable()
export class ProductService {

    constructor(public readonly http: HttpClient) {}

    /**
     * get all products data API
     * This route allow you to get all products data
     * @returns ProductResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public getProducts({
acceptLanguage,
count,
offset,
limit,
page,
filter,
select,
}: {
/**
 * Accept-Language
 * Example : en_US, jp_JP
 */
acceptLanguage?: string,
/**
 * if count = 1 get total items
 */
count?: string,
/**
 * offset
 */
offset?: string,
/**
 * limit
 */
limit?: string,
/**
 * When number of user is greater than 10 in data, it divides into pages each page contain 10 in data.
 * Example : 2
 */
page?: string,
/**
 * filter
 * This will filter all fields about this word
 * Example : name, description, language
 */
filter?: string,
/**
 * Select only fields you want.
 * Example : make, mileage, model
 */
select?: string,
}): Observable<ProductResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/product',
            query: {
                'accept-language': acceptLanguage,
                'count': count,
                'offset': offset,
                'limit': limit,
                'page': page,
                'filter': filter,
                'select': select,
            },
            errors: {
                400: `400 response`,
                404: `404 response`,
                500: `500 response`,
            },
        });
    }

    /**
     * Add new product API
     * This route allow only admin to add new product
     * @returns AddProductResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public addProduct({
requestBody,
}: {
requestBody: ProductModel,
}): Observable<AddProductResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/product',
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
     * get single data API
     * This route allow you to get single product data
     * @returns AddProductResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public getProduct({
id,
}: {
id: string,
}): Observable<AddProductResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/product/id',
            query: {
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
     * Delete product by id API
     * This route allow logged in seller/admin to delete product using it's ID
     * @returns ProductDeleteViewModel 200 response
     * @throws ApiError
     */
    public deleteProduct({
id,
}: {
id: string,
}): Observable<ProductDeleteViewModel> {
        return __request(OpenAPI, this.http, {
            method: 'DELETE',
            url: '/product/id',
            query: {
                'id': id,
            },
            errors: {
                404: `404 response`,
                500: `500 response`,
            },
        });
    }

    /**
     * update product images API
     * This route allow only seller or admin to update product images [ images ]
     * @returns UpdateImagesResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public updateImagesProduct({
requestBody,
}: {
requestBody: ProductImageUrl,
}): Observable<UpdateImagesResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
            method: 'PATCH',
            url: '/product/main-image',
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
     * update product details API
     * This route allow only admin or seller to update product details
     * @returns ProductPutResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public putProductUpdateProfile({
requestBody,
}: {
requestBody: ProductPutRequest,
}): Observable<ProductPutResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
            method: 'PATCH',
            url: '/product/details',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `400 response`,
                404: `404 response`,
                500: `500 response`,
            },
        });
    }

}
