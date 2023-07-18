/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddInquiryResponse } from '../models/AddInquiryResponse';
import type { errorResponse } from '../models/errorResponse';
import type { InquiryDeleteViewModel } from '../models/InquiryDeleteViewModel';
import type { InquiryModel } from '../models/InquiryModel';
import type { InquiryResponse } from '../models/InquiryResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class InquiryService {

    /**
     * get all inquiries data API
     * This route allow logged in admin get all inquiries
     * @returns InquiryResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static getInquiries({
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
}): CancelablePromise<InquiryResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/inquiry',
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
     * Add new inquiry API
     * This route allow  client create new inquiry
     * @returns AddInquiryResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static addInquiry({
requestBody,
}: {
requestBody: InquiryModel,
}): CancelablePromise<AddInquiryResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/inquiry',
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
     * This route allow logged in user you to get single inquiry data
     * @returns AddInquiryResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static getInquiryApi({
id,
}: {
id: string,
}): CancelablePromise<AddInquiryResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/inquiry/inquiryId',
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
     * Delete Inquiry's Data
     * @returns InquiryDeleteViewModel 200 response
     * @throws ApiError
     */
    public static deleteInquiry({
id,
}: {
id: string,
}): CancelablePromise<InquiryDeleteViewModel> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/inquiry/inquiryId',
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
