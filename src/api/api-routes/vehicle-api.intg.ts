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
    getYearsTo, getYearsFrom,
    removeUserVehicles, getMileage, getEngine,
} from '~/routes/endpoints';

export class VehicleApiIntg extends VehicleApi {
    getEngine(make: string, model: string, yearFrom: number, yearTo: number, mileage:string): Promise<string[]> {
        return getEngine(make, model, yearFrom, yearTo, mileage);
    }

    getMileage(make: string, model: string, yearFrom: number, yearTo: number): Promise<string[]> {
        return getMileage(make, model, yearFrom, yearTo);
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
}
