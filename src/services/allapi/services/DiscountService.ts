/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { commonPostResponse } from '../models/commonPostResponse';
import type { DiscountGetResponse } from '../models/DiscountGetResponse';
import type { DiscountPostResponse } from '../models/DiscountPostResponse';
import type { DiscountsGetResponse } from '../models/DiscountsGetResponse';
import type { errorResponse } from '../models/errorResponse';
import type { NewDiscount } from '../models/NewDiscount';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DiscountService {

    /**
     * get all discount codes API
     * This route allow admin to get all discount codes
     * @returns DiscountsGetResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static getDiscounts({
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
 * Example : make, mileage, model
 */
select?: string,
}): CancelablePromise<DiscountsGetResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/discount',
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
     * get categories by id  API
     * This route allow to get discount using it's ID
     * @returns DiscountGetResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static getDiscount({
acceptLanguage,
}: {
/**
 * Accept-Language
 * Example : en_US, jp_JP
 */
acceptLanguage?: string,
}): CancelablePromise<DiscountGetResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/discount/find',
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
     * to verify discount code API
     * This route allow logged in user/seller to verify discount code
     * @returns DiscountPostResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static verifyDiscount({
requestBody,
}: {
requestBody: {
discountCode: string;
},
}): CancelablePromise<DiscountPostResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/discount/verify',
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
     * generate new discount code API
     * This route allow admin to generate new discount code
     * @returns DiscountPostResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static generateDiscount({
requestBody,
}: {
requestBody: NewDiscount,
}): CancelablePromise<DiscountPostResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/discount/generate',
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
     * cancel discount code API
     * This route allow logged in user to cancel discount code
     * @returns commonPostResponse 200 response
     * @throws ApiError
     */
    public static cancelDiscount({
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
            url: '/discount/cancel',
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
     * cancel discount code API
     * This route allow logged in user to cancel discount code
     * @returns commonPostResponse 200 response
     * @throws ApiError
     */
    public static deleteDiscount({
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
            url: '/discount/discountId',
            query: {
                'accept-language': acceptLanguage,
                '_id': id,
            },
            errors: {
                404: `404 response`,
                500: `500 response`,
            },
        });
    }

}
