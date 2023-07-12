/* eslint-disable import/prefer-default-export */

// application
import { IVehicle } from '~/interfaces/vehicle';

export abstract class VehicleApi {
    abstract getEngine(make: string, model: string, yearFrom: number, yearTo: number, mileage:string): Promise<string[]>;

    abstract getMileage(make: string, model: string, yearFrom: number, yearTo: number): Promise<string[]>;

    abstract getYearsFrom(make: string, model: string): Promise<number[]>;

    abstract getYearsTo(make: string, model: string, year: number): Promise<number[]>;

    abstract getMakes(): Promise<string[]>;

    abstract getModels(make: string): Promise<string[]>;

    abstract getVehicles(year: number, make: string, model: string): Promise<IVehicle[]>;

    abstract getVehicleByVin(vin: string): Promise<IVehicle>;

    abstract getUserVehicles(): Promise<IVehicle[]>;

    abstract addUserVehicle(vehicleId: number): Promise<void>;

    abstract removeUserVehicle(vehicleId: number): Promise<void>;
}
