/* eslint-disable import/prefer-default-export,class-methods-use-this */

// application
import { IVehicle } from '~/interfaces/vehicle';
import { VehicleApi } from '~/api/base';
import {
    addUserVehicles,
    getMakes,
    getModels,
    getUserVehicles,
    getVehicleByVin,
    getVehicles,
    getYearsTo, getYearsFrom, getFuel, getTransmission,
    getBodyType, getPriceTo, getPriceFrom,
    removeUserVehicles, getMileage, getEngine, getColor, getAllData,
} from '~/api/routes/endpoints';

export class VehicleApiIntg extends VehicleApi {
    getEngine(make: string, model: string, yearFrom: number, yearTo: number, priceFrom: number, priceTo:number, mileage:string): Promise<string[]> {
        return getEngine(make, model, yearFrom, yearTo, priceFrom, priceTo, mileage);
    }

    getBodyType(make: string, model: string, yearFrom: number, yearTo: number, priceFrom:number, priceTo:number, mileage:string, engine:string,
        transmission:string): Promise<string[]> {
        return getBodyType(make, model, yearFrom, yearTo, priceFrom, priceTo, mileage, engine, transmission);
    }

    getPriceTo(make: string, model: string, yearFrom: number, yearTo: number, priceFrom:number): Promise<number[]> {
        return getPriceTo(make, model, yearFrom, yearTo, priceFrom);
    }

    getPriceFrom(make: string, model: string, yearFrom: number, yearTo: number): Promise<number[]> {
        return getPriceFrom(make, model, yearFrom, yearTo);
    }

    getTransmission(make: string, model: string, yearFrom: number, yearTo: number, priceFrom:number, priceTo:number,
        mileage:string, engine:string): Promise<string[]> {
        return getTransmission(make, model, yearFrom, yearTo, priceFrom, priceTo, mileage, engine);
    }

    getFuel(make: string, model: string, yearFrom: number, yearTo: number, priceFrom:number, priceTo:number, mileage:string, engine:string,
        transmission:string, bodyType:string): Promise<string[]> {
        return getFuel(make, model, yearFrom, yearTo, priceFrom, priceTo, mileage, engine, transmission, bodyType);
    }

    getColor(make: string, model: string, yearFrom: number, yearTo: number, priceFrom:number, priceTo:number, mileage:string, engine:string,
        transmission:string, bodyType:string, fuel:string): Promise<string[]> {
        return getColor(make, model, yearFrom, yearTo, priceTo, priceFrom, mileage, engine, transmission, bodyType, fuel);
    }

    getMileage(make: string, model: string, yearFrom: number, yearTo: number, priceFrom:number, priceTo:number): Promise<string[]> {
        return getMileage(make, model, yearFrom, yearTo, priceFrom, priceTo);
    }

    getYearsFrom(make: string, model: string): Promise<number[]> {
        return getYearsFrom(make, model);
    }

    getYearsTo(make: string, model: string, yearFrom: number): Promise<number[]> {
        return getYearsTo(make, model, yearFrom);
    }

    getMakes(): Promise<string[]> {
        return getMakes();
    }

    getModels(make: string): Promise<string[]> {
        return getModels(make);
    }

    getVehicles(year: number, make: string, model: string): Promise<IVehicle[]> {
        return getVehicles(year, make, model);
    }

    getVehicleByVin(vin: string): Promise<IVehicle> {
        return getVehicleByVin(vin);
    }

    getUserVehicles(): Promise<IVehicle[]> {
        return getUserVehicles();
    }

    addUserVehicle(vehicleId: number): Promise<void> {
        return addUserVehicles(vehicleId);
    }

    removeUserVehicle(vehicleId: number): Promise<void> {
        return removeUserVehicles(vehicleId);
    }

    getAllData(): Promise<any> {
        return getAllData();
    }
}
