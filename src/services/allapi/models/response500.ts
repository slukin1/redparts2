/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type response500 = {
    /**
     * Error
     */
    type: string;
    /**
     * error code
     */
    statusCode: number;
    /**
     * error details
     */
    error: string;
    /**
     * error message
     */
    message: string;
    /**
     * error data
     */
    data: string | null;
};
