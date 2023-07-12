// application
import { clone, delayResponse, error } from '~/routes/utils';
import { IVehicle } from '~/interfaces/vehicle';
import { userVehicles, vehicles } from '~/routes/database/vehicles';
import { VehicleService } from '~/services/allapi';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getMileage(make: string, model:string, yearFrom:number, yearTo:number): Promise<string[]> {
    const result: string[] = [
        '0-10000',
        '10000-20000',
        '20000-30000',
        '30000-40000',
        '40000-50000',
        '50000-60000',
        '60000-70000',
        '70000-80000',
        '80000-90000',
        '90000-100000',
        '100000-110000',
        '110000-120000',
        '120000-130000',
    ];
    return delayResponse(Promise.resolve(result), 750);
}

export async function getEngine(make: string, model:string, yearFrom:number, yearTo:number, mileage:string): Promise<string[]> {
    localStorage.setItem('query', JSON.stringify({
        make: make.includes(' ') ? make.split(' ').join('_') : make, model: model.includes(' ') ? model.split(' ').join('_') : model, yearFrom, yearTo, mileage,
    }));
    const response = await VehicleService.getEngineTypes({ acceptLanguage: 'en_US' });
    // @ts-ignore
    return delayResponse(Promise.resolve(response?.results), 750);
}

export async function getTransmission(make: string, model:string, yearFrom:number, yearTo:number, mileage:string, engine:string): Promise<string[]> {
    const response = await VehicleService.getTransmissionTypes({ acceptLanguage: 'en_US' });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getYearsFrom(make:string, model:string): Promise<number[]> {
    const response = await VehicleService.getYears({ acceptLanguage: 'en_US' });
    // @ts-ignore
    return delayResponse(Promise.resolve(response?.results.sort()), 750);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getYearsTo(make: string, model:string, yearFrom:number): Promise<number[]> {
    const result: number[] = [];
    const response = await VehicleService.getYears({ acceptLanguage: 'en_US' });
    // @ts-ignore
    response?.results.forEach((year) => {
        if (year >= yearFrom) {
            result.push(year);
        }
    });

    return delayResponse(Promise.resolve(result.sort()), 750);
}

export async function getModels(maker: string): Promise<string[]> {
    const response = await VehicleService.getModelsMake({ maker });
    // @ts-ignore
    return delayResponse(Promise.resolve(response?.results.sort()), 750);
}

export async function getMakes(): Promise<string[]> {
    const response = await VehicleService.getMakers({ acceptLanguage: 'en_US' });
    // @ts-ignore
    const responseMake = response.results.map((x) => x.make);
    // @ts-ignore
    return delayResponse(Promise.resolve(responseMake.sort()), 750);
}

export function getVehicles(year: number, make: string, model: string): Promise<IVehicle[]> {
    const result = vehicles.filter((x) => x.year === year && x.make === make && x.model === model);

    return delayResponse(Promise.resolve(result.sort()), 750);
}

export function getVehicleByVin(vin: string): Promise<IVehicle> {
    const vinValue = vin.trim();

    const vehicle = vehicles.find((x) => x.model === 'Focus S');

    if (vinValue === '' || vinValue === 'error' || !vehicle) {
        return error('Index Not Found');
    }

    return Promise.resolve(vehicle);
}

export function getUserVehicles(): Promise<IVehicle[]> {
    return Promise.resolve(clone(userVehicles));
}

export function addUserVehicles(vehicleId: number): Promise<void> {
    const index = userVehicles.findIndex((x) => x.id === vehicleId);
    const vehicle = vehicles.find((x) => x.id === vehicleId);

    if (vehicle && index === -1) {
        userVehicles.push(vehicle);
    }

    return delayResponse(Promise.resolve());
}

export function removeUserVehicles(vehicleId: number): Promise<void> {
    const index = userVehicles.findIndex((x) => x.id === vehicleId);

    if (index !== -1) {
        userVehicles.splice(index, 1);
    }

    return delayResponse(Promise.resolve());
}
