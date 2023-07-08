/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddVehicleResponse } from '../models/AddVehicleResponse';
import type { errorResponse } from '../models/errorResponse';
import type { RangeList } from '../models/RangeList';
import type { VehicleDeleteViewModel } from '../models/VehicleDeleteViewModel';
import type { VehicleModel } from '../models/VehicleModel';
import type { VehicleResponse } from '../models/VehicleResponse';
import type { VehicleStatusParams } from '../models/VehicleStatusParams';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class VehicleService {

    /**
     * get all vehicles data API
     * This route allow you to get all vehicles data
     * @returns VehicleResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static getVehicles({
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
}): CancelablePromise<VehicleResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vehicle',
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
     * Add new vehicle API
     * This route allow only admin to add new vehicle
     * @returns AddVehicleResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static addVehicle({
requestBody,
}: {
requestBody: VehicleModel,
}): CancelablePromise<AddVehicleResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vehicle',
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
     * search vehicles data API
     * This route allow you to search vehicles data
     * @returns VehicleResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static searchtVehicles({
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
}): CancelablePromise<VehicleResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vehicle/search',
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
     * get list of vehicles data API
     * This route allow you to get list of vehicles data
     * @returns VehicleResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static getVehicleList({
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
}): CancelablePromise<VehicleResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vehicle/list',
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
     * This route allow you to get single vehicle data
     * @returns AddVehicleResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static getVehicleApi({
id,
}: {
id: string,
}): CancelablePromise<AddVehicleResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vehicle/vehicleId',
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
     * Delete Vehicle's Data
     * @returns VehicleDeleteViewModel 200 response
     * @throws ApiError
     */
    public static deleteVehicle({
id,
}: {
id: string,
}): CancelablePromise<VehicleDeleteViewModel> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/vehicle/vehicleId',
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
     * update vehicle status API
     * This route allow you to update vehicle status
     * @returns AddVehicleResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static updateVehicleStatusApi({
requestBody,
}: {
requestBody: VehicleStatusParams,
}): CancelablePromise<AddVehicleResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vehicle/status',
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
     * vehicles makers data API
     * This route allow you to get vehicles makers data
     * @returns any 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static getMakers({
acceptLanguage,
}: {
/**
 * Accept-Language
 * Example : en_US, jp_JP
 */
acceptLanguage?: string,
}): CancelablePromise<{
results: Array<string>;
} | errorResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vehicle/makers',
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
     * vehicles model data API
     * This route allow you to get vehicles models data
     * @returns any 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static getModels({
acceptLanguage,
}: {
/**
 * Accept-Language
 * Example : en_US, jp_JP
 */
acceptLanguage?: string,
}): CancelablePromise<{
results: Array<string>;
} | errorResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vehicle/models',
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
     * vehicles years data API
     * This route allow you to get vehicles years data
     * @returns any 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static getYears({
acceptLanguage,
}: {
/**
 * Accept-Language
 * Example : en_US, jp_JP
 */
acceptLanguage?: string,
}): CancelablePromise<{
results: Array<number>;
} | errorResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vehicle/years',
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
     * vehicles Engine Types data API
     * This route allow you to get vehicles Engine Types data
     * @returns any 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static getEngineTypes({
acceptLanguage,
}: {
/**
 * Accept-Language
 * Example : en_US, jp_JP
 */
acceptLanguage?: string,
}): CancelablePromise<{
results: Array<string>;
} | errorResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vehicle/engine-types',
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
     * vehicles Body Types data API
     * This route allow you to get vehicles BodyTypes data
     * @returns any 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static getBodyTypes({
acceptLanguage,
}: {
/**
 * Accept-Language
 * Example : en_US, jp_JP
 */
acceptLanguage?: string,
}): CancelablePromise<{
results: Array<string>;
} | errorResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vehicle/body-types',
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
     * vehicles Models Make data API
     * This route allow you to get vehicles Models for a Make data
     * @returns any 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static getModelsMake({
maker,
}: {
maker: string,
}): CancelablePromise<{
results: Array<string>;
} | errorResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vehicle/models-by-maker',
            query: {
                'maker': maker,
            },
            errors: {
                400: `400 response`,
                404: `404 response`,
                500: `500 response`,
            },
        });
    }

    /**
     * vehicles Models year data API
     * This route allow you to get vehicles Models by year data
     * @returns any 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static getModelsByYear({
year,
}: {
year: number,
}): CancelablePromise<{
results: Array<string>;
} | errorResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vehicle/models-by-year',
            query: {
                'year': year,
            },
            errors: {
                400: `400 response`,
                404: `404 response`,
                500: `500 response`,
            },
        });
    }

    /**
     * vehicles Models year and make data API
     * This route allow you to get vehicles Models by year and make data
     * @returns any 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static getModelsByYearMaker({
year,
maker,
}: {
year: number,
maker: string,
}): CancelablePromise<{
results: Array<string>;
} | errorResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vehicle/models-by-year-maker',
            query: {
                'year': year,
                'maker': maker,
            },
            errors: {
                400: `400 response`,
                404: `404 response`,
                500: `500 response`,
            },
        });
    }

    /**
     * vehicles Maker by model data API
     * This route allow you to get vehicles Maker by model data
     * @returns any 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static getMakeModels({
model,
}: {
model: string,
}): CancelablePromise<{
results: Array<string>;
} | errorResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vehicle/makers-by-model',
            query: {
                'model': model,
            },
            errors: {
                400: `400 response`,
                404: `404 response`,
                500: `500 response`,
            },
        });
    }

    /**
     * vehicles data by year make and model API
     * This route allow you to get vehicles data by  year make and model
     * @returns VehicleResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static getByYearMakerModel({
year,
maker,
model,
}: {
year: number,
maker: string,
model: string,
}): CancelablePromise<VehicleResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vehicle/by-year-maker-model',
            query: {
                'year': year,
                'maker': maker,
                'model': model,
            },
            errors: {
                400: `400 response`,
                404: `404 response`,
                500: `500 response`,
            },
        });
    }

    /**
     * vehicles data by optional   API
     * This route allow you to get vehicles data by option
     * @returns VehicleResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static filterVehicle({
year,
price,
mileage,
maker,
model,
bodyType,
engineType,
transmission,
condition,
location,
refNo,
fuel,
status,
color,
}: {
year?: string,
price?: string,
mileage?: string,
maker?: string,
model?: string,
bodyType?: string,
engineType?: string,
transmission?: string,
condition?: string,
location?: string,
refNo?: string,
fuel?: string,
status?: string,
color?: string,
}): CancelablePromise<VehicleResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vehicle/filter',
            query: {
                'year': year,
                'price': price,
                'mileage': mileage,
                'maker': maker,
                'model': model,
                'bodyType': bodyType,
                'engineType': engineType,
                'transmission': transmission,
                'condition': condition,
                'location': location,
                'refNo': refNo,
                'fuel': fuel,
                'status': status,
                'color': color,
            },
            errors: {
                400: `400 response`,
                404: `404 response`,
                500: `500 response`,
            },
        });
    }

    /**
     * vehicles data by range API
     * This route allow you to get vehicles data by years, prices or mileage rabge
     * @returns VehicleResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public static vehicleRange({
requestBody,
}: {
requestBody: RangeList,
}): CancelablePromise<VehicleResponse | errorResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vehicle/range',
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
