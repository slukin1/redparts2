/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

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

import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

@Injectable()
export class CategoryService {

    constructor(public readonly http: HttpClient) {}

    /**
     * get all categories data API
     * This route allow to get all categories
     * @returns CategoriesGetResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public getCategories({
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
}): Observable<CategoriesGetResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
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
    public addCategory({
requestBody,
}: {
requestBody: AddCategoryBody,
}): Observable<CategoryPostResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
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
    public getCategory({
id,
}: {
id: string,
}): Observable<CategoryGetResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
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
    public putCategory({
requestBody,
}: {
requestBody: UpdateCategoryBody,
}): Observable<CategoryPutResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
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
    public deleteCategory({
id,
}: {
id: string,
}): Observable<CategoryDeleteResponse> {
        return __request(OpenAPI, this.http, {
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
    public putCategoryImage({
requestBody,
}: {
requestBody: UpdateCategoryImageBody,
}): Observable<CategoryImageUdateResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
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
