/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

import type { AddVehicleResponse } from '../models/AddVehicleResponse';
import type { errorResponse } from '../models/errorResponse';
import type { RangeList } from '../models/RangeList';
import type { VehicleDeleteViewModel } from '../models/VehicleDeleteViewModel';
import type { VehicleModel } from '../models/VehicleModel';
import type { VehicleResponse } from '../models/VehicleResponse';
import type { VehicleStatusParams } from '../models/VehicleStatusParams';

import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

@Injectable()
export class VehicleService {

    constructor(public readonly http: HttpClient) {}

    /**
     * get all vehicles data API
     * This route allow you to get all vehicles data
     * @returns VehicleResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public getVehicles({
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
}): Observable<VehicleResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
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
    public addVehicle({
requestBody,
}: {
requestBody: VehicleModel,
}): Observable<AddVehicleResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
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
    public searchVehicles({
keyWord,
acceptLanguage,
count,
offset,
limit,
page,
filter,
select,
}: {
keyWord: string,
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
}): Observable<VehicleResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/vehicle/search',
            query: {
                'accept-language': acceptLanguage,
                'keyWord': keyWord,
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
    public getVehicleList({
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
}): Observable<VehicleResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
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
    public getVehicleApi({
id,
}: {
id: string,
}): Observable<AddVehicleResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
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
    public deleteVehicle({
id,
}: {
id: string,
}): Observable<VehicleDeleteViewModel> {
        return __request(OpenAPI, this.http, {
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
    public updateVehicleStatusApi({
requestBody,
}: {
requestBody: VehicleStatusParams,
}): Observable<AddVehicleResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
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
    public getMakers({
acceptLanguage,
}: {
/**
 * Accept-Language
 * Example : en_US, jp_JP
 */
acceptLanguage?: string,
}): Observable<{
results: Array<{
make: string;
total: number;
}>;
} | errorResponse> {
        return __request(OpenAPI, this.http, {
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
     * vehicles locations data API
     * This route allow you to get vehicles locations data
     * @returns any 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public getLocations({
acceptLanguage,
}: {
/**
 * Accept-Language
 * Example : en_US, jp_JP
 */
acceptLanguage?: string,
}): Observable<{
results: Array<{
location: string;
make: string;
totalVehicles: number;
}>;
} | errorResponse> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/vehicle/locations',
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
     * vehicles fuels data API
     * This route allow you to get vehicles fuels data
     * @returns errorResponse default response
     * @throws ApiError
     */
    public getFuels({
acceptLanguage,
}: {
/**
 * Accept-Language
 * Example : en_US, jp_JP
 */
acceptLanguage?: string,
}): Observable<errorResponse> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/vehicle/fuels',
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
     * vehicles transmissions data API
     * This route allow you to get vehicles transmissions data
     * @returns any 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public getTransmissions({
acceptLanguage,
}: {
/**
 * Accept-Language
 * Example : en_US, jp_JP
 */
acceptLanguage?: string,
}): Observable<{
results: Array<string>;
} | errorResponse> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/vehicle/transmissions',
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
     * vehicles colors data API
     * This route allow you to get vehicles colors data
     * @returns any 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public getColors({
acceptLanguage,
}: {
/**
 * Accept-Language
 * Example : en_US, jp_JP
 */
acceptLanguage?: string,
}): Observable<{
results: Array<string>;
} | errorResponse> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/vehicle/colors',
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
    public getModels({
acceptLanguage,
}: {
/**
 * Accept-Language
 * Example : en_US, jp_JP
 */
acceptLanguage?: string,
}): Observable<{
results: Array<string>;
} | errorResponse> {
        return __request(OpenAPI, this.http, {
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
    public getYears({
acceptLanguage,
}: {
/**
 * Accept-Language
 * Example : en_US, jp_JP
 */
acceptLanguage?: string,
}): Observable<{
results: Array<number>;
} | errorResponse> {
        return __request(OpenAPI, this.http, {
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
    public getEngineTypes({
acceptLanguage,
}: {
/**
 * Accept-Language
 * Example : en_US, jp_JP
 */
acceptLanguage?: string,
}): Observable<{
results: Array<string>;
} | errorResponse> {
        return __request(OpenAPI, this.http, {
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
    public getBodyTypes({
acceptLanguage,
}: {
/**
 * Accept-Language
 * Example : en_US, jp_JP
 */
acceptLanguage?: string,
}): Observable<{
results: {
bodyTypes: Array<string>;
total: number;
};
} | errorResponse> {
        return __request(OpenAPI, this.http, {
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
    public getModelsMake({
maker,
}: {
maker: string,
}): Observable<{
results: Array<{
make: string;
total: number;
}>;
} | errorResponse> {
        return __request(OpenAPI, this.http, {
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
    public getModelsByYear({
year,
}: {
year: number,
}): Observable<{
results: Array<string>;
} | errorResponse> {
        return __request(OpenAPI, this.http, {
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
    public getModelsByYearMaker({
year,
maker,
}: {
year: number,
maker: string,
}): Observable<{
results: Array<string>;
} | errorResponse> {
        return __request(OpenAPI, this.http, {
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
    public getMakeModels({
model,
}: {
model: string,
}): Observable<{
results: Array<string>;
} | errorResponse> {
        return __request(OpenAPI, this.http, {
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
    public getByYearMakerModel({
year,
maker,
model,
}: {
year: number,
maker: string,
model: string,
}): Observable<VehicleResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
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
    public filterVehicle({
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
count,
offset,
limit,
page,
filter,
select,
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
}): Observable<VehicleResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
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
     * vehicles data by range API
     * This route allow you to get vehicles data by years, prices or mileage rabge
     * @returns VehicleResponse 200 response
     * @returns errorResponse default response
     * @throws ApiError
     */
    public vehicleRange({
requestBody,
}: {
requestBody: RangeList,
}): Observable<VehicleResponse | errorResponse> {
        return __request(OpenAPI, this.http, {
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
