/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

import type { AddOrderResponse } from '../models/AddOrderResponse';
import type { errorResponse } from '../models/errorResponse';
import type { OrderDeleteViewModel } from '../models/OrderDeleteViewModel';
import type { OrderModel } from '../models/OrderModel';
import type { OrderPutRequest } from '../models/OrderPutRequest';
import type { OrderPutResponse } from '../models/OrderPutResponse';
import type { OrderResponse } from '../models/OrderResponse';
import type { OrderStatusPutRequest } from '../models/OrderStatusPutRequest';

import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

@Injectable()
export class OrderService {

    constructor(public readonly http: HttpClient) {}

    /**
     * get all orders data API
     * This route allow logged in user/seller/admin get his orders
     * @returns OrderResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public getOrders({
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
 * count
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
 * Example : name, profileImage
 */
select?: string,
}): Observable<OrderResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/order',
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
     * Add new order API
     * This route allow logged in user/seller/admin create new order
     * @returns AddOrderResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public addOrder({
requestBody,
}: {
requestBody: OrderModel,
}): Observable<AddOrderResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/order',
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
     * This route allow you to get single order data
     * @returns AddOrderResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public getOrderApi({
id,
}: {
id: string,
}): Observable<AddOrderResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/order/orderId',
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
     * Delete LoggedIn API
     * Delete Order's Data
     * @returns OrderDeleteViewModel 200 response
     * @throws ApiError
     */
    public deleteOrder({
id,
}: {
id: string,
}): Observable<OrderDeleteViewModel> {
        return __request(OpenAPI, this.http, {
            method: 'DELETE',
            url: '/order/orderId',
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
     * update Oder status API
     * This route allow logged in seller update order status
     * @returns OrderPutResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public patchOrderUpdate({
requestBody,
}: {
requestBody: OrderStatusPutRequest,
}): Observable<OrderPutResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
            method: 'PATCH',
            url: '/order/orderstatus',
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
     * update order API
     * This route allow logged in admin to update order details
     * @returns OrderPutResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public putOrderUpdate({
requestBody,
}: {
requestBody: OrderPutRequest,
}): Observable<OrderPutResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
            method: 'PUT',
            url: '/order/update-details',
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
