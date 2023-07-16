/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

import type { commonGetResponse } from '../models/commonGetResponse';
import type { errorResponse } from '../models/errorResponse';
import type { OneReviewParams } from '../models/OneReviewParams';
import type { ReviewResponse } from '../models/ReviewResponse';

import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

@Injectable()
export class ReviewService {

    constructor(public readonly http: HttpClient) {}

    /**
     * get all reviews data API
     * This route allow logged in user/seller/admin get his reviews
     * @returns ReviewResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public getReviews({
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
}): Observable<ReviewResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
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
    public addReview({
requestBody,
}: {
requestBody: {
review: string;
rating: number;
},
}): Observable<commonGetResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
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
    public getReviewApi({
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
}): Observable<ReviewResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
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
    public patchReviewUpdate({
requestBody,
}: {
requestBody: OneReviewParams,
}): Observable<commonGetResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
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
    public deleteReview({
productId,
reviewId,
}: {
productId: string,
reviewId: string,
}): Observable<commonGetResponse> {
        return __request(OpenAPI, this.http, {
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
