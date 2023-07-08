/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { commonGetResponse } from '../models/commonGetResponse';
import type { errorResponse } from '../models/errorResponse';
import type { OneReviewParams } from '../models/OneReviewParams';
import type { ReviewResponse } from '../models/ReviewResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ReviewService {

    /**
     * get all reviews data API
     * This route allow logged in user/seller/admin get his reviews
     * @returns ReviewResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static getReviews({
productId,
acceptLanguage,
count,
offset,
limit,
page,
filter,
select,
}: {
productId: string,
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
}): CancelablePromise<ReviewResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/review',
            query: {
                'accept-language': acceptLanguage,
                'productId': productId,
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
     * make a review on a product API
     * This route allow logged in user/seller/admin to make a review on a product
     * @returns commonGetResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static addReview({
requestBody,
}: {
requestBody: {
review: string;
rating: number;
},
}): CancelablePromise<commonGetResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/review',
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
     * get specific review API
     * This route allow you to get specific review using it's ID
     * @returns ReviewResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static getReviewApi({
productId,
reviewId,
acceptLanguage,
}: {
productId: string,
reviewId: string,
/**
 * Accept-Language
 * Example : en_US, jp_JP
 */
acceptLanguage?: string,
}): CancelablePromise<ReviewResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/review/productId/reviews/reviewId',
            query: {
                'accept-language': acceptLanguage,
                'productId': productId,
                'reviewId': reviewId,
            },
            errors: {
                400: `400 response`,
                404: `404 response`,
                500: `500 response`,
            },
        });
    }

    /**
     * update review API
     * This route allow logged in user/seller/admin to update review using it's ID
     * @returns commonGetResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static patchReviewUpdate({
requestBody,
}: {
requestBody: OneReviewParams,
}): CancelablePromise<commonGetResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/review/productId/reviews/reviewId',
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
     * delete review API
     * This route allow logged in user/seller/admin to delete review using it's ID
     * @returns commonGetResponse 200 response
     * @throws ApiError
     */
    public static deleteReview({
productId,
reviewId,
}: {
productId: string,
reviewId: string,
}): CancelablePromise<commonGetResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/review/reviewId',
            query: {
                'productId': productId,
                'reviewId': reviewId,
            },
            errors: {
                404: `404 response`,
                500: `500 response`,
            },
        });
    }

}
