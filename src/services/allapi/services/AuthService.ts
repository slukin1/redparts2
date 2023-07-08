/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { commonPostResponse } from '../models/commonPostResponse';
import type { errorResponse } from '../models/errorResponse';
import type { LoginRequestBody } from '../models/LoginRequestBody';
import type { LoginResponse } from '../models/LoginResponse';
import type { RegisterData } from '../models/RegisterData';
import type { RegisterResponse } from '../models/RegisterResponse';
import type { Token } from '../models/Token';
import type { TokenPostResponse } from '../models/TokenPostResponse';
import type { UserChangePassword } from '../models/UserChangePassword';
import type { UserMail } from '../models/UserMail';
import type { UserResetPassword } from '../models/UserResetPassword';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * login API
     * This route allow you to login into the api
     * @returns LoginResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static userLogin({
requestBody,
}: {
requestBody: LoginRequestBody,
}): CancelablePromise<LoginResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/login',
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
     * User register API
     * This route allow you to sign up into the api
 * only userName email password passwordConfirmation are required
     * @returns RegisterResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static registerUser({
requestBody,
}: {
requestBody: RegisterData,
}): CancelablePromise<RegisterResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/register',
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
     * User logout API
     * This route allow you to logout from the api
     * @returns commonPostResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static userLogout({
requestBody,
}: {
requestBody: Token,
}): CancelablePromise<commonPostResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/logout',
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
     * User token API
     * This route allow the user with a refresh token to regenerate tokens when the access token expires
     * @returns TokenPostResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static userToken({
requestBody,
}: {
requestBody: Token,
}): CancelablePromise<TokenPostResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/tokens',
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
     * User password forgot API
     * This route allow you to send email with the reset password link to reset the password you forgot
     * @returns commonPostResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static passwordForgot({
requestBody,
}: {
requestBody: UserMail,
}): CancelablePromise<commonPostResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/forgot-password',
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
     * User password reset API
     * Reset you password using the reset token.
     * @returns commonPostResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static passwordReset({
requestBody,
}: {
requestBody: UserResetPassword,
}): CancelablePromise<commonPostResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/reset-password',
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
     * User password change API
     * This route allow you to user to change his password
     * @returns commonPostResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static passwordChange({
requestBody,
}: {
requestBody: UserChangePassword,
}): CancelablePromise<commonPostResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/change-password',
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
