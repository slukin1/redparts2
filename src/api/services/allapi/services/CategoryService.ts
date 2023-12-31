/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddCategoryBody } from '../models/AddCategoryBody';
import type { CategoriesGetResponse } from '../models/CategoriesGetResponse';
import type { CategoryDeleteResponse } from '../models/CategoryDeleteResponse';
import type { CategoryGetResponse } from '../models/CategoryGetResponse';
import type { CategoryImageUdateResponse } from '../models/CategoryImageUdateResponse';
import type { CategoryPostResponse } from '../models/CategoryPostResponse';
import type { CategoryPutResponse } from '../models/CategoryPutResponse';
import type { errorResponse } from '../models/errorResponse';
import type { UpdateCategoryBody } from '../models/UpdateCategoryBody';
import type { UpdateCategoryImageBody } from '../models/UpdateCategoryImageBody';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CategoryService {

    /**
     * get all categories data API
     * This route allow to get all categories
     * @returns CategoriesGetResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static getCategories({
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
}): CancelablePromise<CategoriesGetResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/category',
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
     * Add new category API
     * This route allow only admin to add new category
     * @returns CategoryPostResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static addCategory({
requestBody,
}: {
requestBody: AddCategoryBody,
}): CancelablePromise<CategoryPostResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/category',
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
     * get categories by id  API
     * This route allow to get category using it's ID
     * @returns CategoryGetResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static getCategory({
id,
}: {
id: string,
}): CancelablePromise<CategoryGetResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/category/categoryId',
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
     * update category by id  API
     * This route allow only admin to update category details [name / description]
     * @returns CategoryPutResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static putCategory({
requestBody,
}: {
requestBody: UpdateCategoryBody,
}): CancelablePromise<CategoryPutResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/category/categoryId',
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
     * Delete category API
     * This route allow only admin to delete the category
     * @returns CategoryDeleteResponse 200 response
     * @throws ApiError
     */
    public static deleteCategory({
id,
}: {
id: string,
}): CancelablePromise<CategoryDeleteResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/category/categoryId',
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
     * update category image by id  API
     * This route allow only admin to update category image [image]
     * @returns CategoryImageUdateResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static putCategoryImage({
requestBody,
}: {
requestBody: UpdateCategoryImageBody,
}): CancelablePromise<CategoryImageUdateResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/categoryId/image',
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
