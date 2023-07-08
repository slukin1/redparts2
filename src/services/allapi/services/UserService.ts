/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

import type { AddUserResponse } from '../models/AddUserResponse';
import type { errorResponse } from '../models/errorResponse';
import type { UpdateProfileImageResponse } from '../models/UpdateProfileImageResponse';
import type { UserDeleteViewModel } from '../models/UserDeleteViewModel';
import type { UserModel } from '../models/UserModel';
import type { UserPutRequest } from '../models/UserPutRequest';
import type { UserPutResponse } from '../models/UserPutResponse';
import type { UserResponse } from '../models/UserResponse';

import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

@Injectable()
export class UserService {

    constructor(public readonly http: HttpClient) {}

    /**
     * get all users data API
     * This route allow you to get all users data
     * @returns UserResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public getUsers({
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
}): Observable<UserResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/user/all-users',
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
     * get single data API
     * This route allow you to get single user data
     * @returns AddUserResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public getUserApi({
id,
}: {
id: string,
}): Observable<AddUserResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/user/userId',
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
     * Delete User's Data
     * @returns UserDeleteViewModel 200 response
     * @throws ApiError
     */
    public deleteUser({
id,
}: {
id: string,
}): Observable<UserDeleteViewModel> {
        return __request(OpenAPI, this.http, {
            method: 'DELETE',
            url: '/user/userId',
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
     * Add new user API
     * This route allow only admin to add new user
     * @returns AddUserResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public addUser({
requestBody,
}: {
requestBody: UserModel,
}): Observable<AddUserResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/user',
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
     * update profile image API
     * Update user profile image
     * @returns UpdateProfileImageResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public updateProfileUser({
image,
}: {
image: string,
}): Observable<UpdateProfileImageResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
            method: 'PATCH',
            url: '/user/update-profile-image',
            query: {
                'image': image,
            },
            errors: {
                400: `400 response`,
                404: `404 response`,
                500: `500 response`,
            },
        });
    }

    /**
     * update his own profile API
     * This route allow logged in user to update his own profile details
     * @returns UserPutResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public putUserUpdateProfile({
requestBody,
}: {
requestBody: UserPutRequest,
}): Observable<UserPutResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
            method: 'PATCH',
            url: '/user/update-details',
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
     * Delete LoggedIn API
     * Delete LoggedIn User's Data
     * @returns UserDeleteViewModel 200 response
     * @throws ApiError
     */
    public userSelfDelete({
id,
profileImageId,
}: {
id: string,
profileImageId: string,
}): Observable<UserDeleteViewModel> {
        return __request(OpenAPI, this.http, {
            method: 'DELETE',
            url: '/user/me',
            query: {
                'id': id,
                'profileImageId': profileImageId,
            },
            errors: {
                404: `404 response`,
                500: `500 response`,
            },
        });
    }

}
