// application
import { clone, delayResponse, error } from '~/api/routes/utils';
import { IVehicle } from '~/interfaces/vehicle';
import { userVehicles, vehicles } from '~/api/routes/database/vehicles';
import { VehicleService } from '~/api/services/allapi';

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getDataFromLocalStorage(key: string): Promise<any> {
    const maxRetries = 5;
    let retryCount = 0;

    while (retryCount < maxRetries) {
        try {
            const allData = localStorage.getItem('allData');
            if (allData) {
                console.log('→ getDataFromLocalStorage');
                const parsedData = JSON.parse(allData);
                const data = parsedData[key];
                if (data) {
                    return data;
                }
            }
        } catch (error) {
            console.error(error);
        }

        // eslint-disable-next-line no-await-in-loop
        await delay(750);
        console.log('→ Retrying...');
        retryCount += 1;
    }

    return 'Failed';
}

async function filterUndefinedNullEmpty<T>(promise: Promise<T[]>): Promise<T[]> {
    const results = await promise;
    // @ts-ignore
    return results.filter((item) => item !== undefined && item !== null && item !== '');
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getEngine(_make: string, _model: string, _yearFrom: number, _yearTo: number, _mileage: string): Promise<string[]> {
    let response: any;
    if (typeof window !== 'undefined') {
        response = await getDataFromLocalStorage('engine');
    }
    if (!response || response === 'Failed') {
        response = await VehicleService.getEngineTypes({ acceptLanguage: 'en-US' });
    }
    return delayResponse(Promise.resolve(filterUndefinedNullEmpty(response?.results)), 750);
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getPriceFrom(_make: string, _model: string, _yearFrom: number, _yearTo: number): Promise<number[]> {
    // and array from 0-50000 with step 1000
    const result = Array.from(Array(51).keys()).map((x) => x * 1000);
    return delayResponse(Promise.resolve(result), 750);
}

export function getPriceTo(_make: string, _model: string, _yearFrom: number, _yearTo: number, priceFrom:number): Promise<number[]> {
    const result = Array.from(Array(51).keys()).map((x) => x * 1000).filter((x) => x > priceFrom);
    return delayResponse(Promise.resolve(result), 750);
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getTransmission(_make: string, _model: string, _yearFrom: number, _yearTo: number, _mileage: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _engine: string): Promise<string[]> {
    let response: any;
    if (typeof window !== 'undefined') {
        response = await getDataFromLocalStorage('transmissions');
    }
    if (!response || response === 'Failed') {
        response = await VehicleService.getTransmissions({ acceptLanguage: 'en-US' });
    }

    return delayResponse(Promise.resolve(filterUndefinedNullEmpty(response?.results)), 750);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getBodyType(_make: string, _model: string, _yearFrom: number, _yearTo: number, _mileage: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _engine: string, _transmission: string): Promise<string[]> {
    let response: any;
    if (typeof window !== 'undefined') {
        response = await getDataFromLocalStorage('bodyTypes');
    }
    if (!response || response === 'Failed') {
        response = await VehicleService.getBodyTypes({ acceptLanguage: 'en-US' });
    }
    const responseMake = response.results.map((x: any) => x.bodyType);
    return delayResponse(Promise.resolve(filterUndefinedNullEmpty(responseMake)), 750);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getFuel(_make: string, _model: string, _yearFrom: number, _yearTo: number, _mileage: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _engine: string, _transmission: string, _bodyType: string): Promise<string[]> {
    let response: any;
    if (typeof window !== 'undefined') {
        response = await getDataFromLocalStorage('fuels');
    }
    if (!response || response === 'Failed') {
        response = await VehicleService.getFuels({ acceptLanguage: 'en-US' });
    }
    return delayResponse(Promise.resolve(filterUndefinedNullEmpty(response?.results)), 750);
}

export async function getColor(make: string, model: string, yearFrom: number, yearTo: number, priceFrom:number, priceTo:number, mileage: string,
    engine: string, transmission: string, bodyType: string, fuel: string): Promise<string[]> {
    localStorage.setItem('query', JSON.stringify({
        make: make.includes(' ') ? make.split(' ').join('_') : make,
        model: model.includes(' ') ? model.split(' ').join('_') : model,
        yearFrom,
        yearTo,
        priceFrom,
        priceTo,
        mileage,
        engineType: engine.includes(' ') ? engine.split(' ').join('_') : engine,
        transmission: transmission.includes(' ') ? transmission.split(' ').join('_') : transmission,
        bodyType: bodyType.includes(' ') ? bodyType.split(' ').join('_') : bodyType,
        fuel: fuel.includes(' ') ? fuel.split(' ').join('_') : fuel,
    }));
    let response: any;
    if (typeof window !== 'undefined') {
        response = await getDataFromLocalStorage('colors');
    }
    if (!response || response === 'Failed') {
        response = await VehicleService.getColors({ acceptLanguage: 'en-US' });
    }
    return delayResponse(Promise.resolve(filterUndefinedNullEmpty(response?.results)), 750);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getYearsFrom(_make: string, _model: string): Promise<number[]> {
    let response: any;
    if (typeof window !== 'undefined') {
        response = await getDataFromLocalStorage('years');
    }
    if (!response || response === 'Failed') {
        response = await VehicleService.getYears({ acceptLanguage: 'en-US' });
    }
    return delayResponse(Promise.resolve(response?.results.sort()), 750);
}

export async function getYearsTo(make: string, model: string, yearFrom: number): Promise<number[]> {
    const result: number[] = [];
    let response: any;
    if (typeof window !== 'undefined') {
        response = await getDataFromLocalStorage('years');
    }
    if (!response || response === 'Failed') {
        response = await VehicleService.getYears({ acceptLanguage: 'en-US' });
    }
    response?.results.forEach((year: any) => {
        if (year >= yearFrom) {
            result.push(year);
        }
    });
    return delayResponse(Promise.resolve(result.sort()), 750);
}

export async function getMakes(): Promise<string[]> {
    let response: any;
    if (typeof window !== 'undefined') {
        response = await getDataFromLocalStorage('makes');
    }
    if (!response || response === 'Failed') {
        response = await VehicleService.getMakers({ acceptLanguage: 'en-US' });
    }
    const responseMake = response.results.map((x: any) => x.make);
    return delayResponse(Promise.resolve(filterUndefinedNullEmpty(responseMake.sort())), 750);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getMileage(_make: string, _model:string, _yearFrom:number, _yearTo:number): Promise<string[]> {
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

export async function getModels(maker: string): Promise<string[]> {
    const response = await VehicleService.getModelsMake({ maker });
    // @ts-ignore
    return delayResponse(Promise.resolve(filterUndefinedNullEmpty(response?.results.sort())), 750);
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

export async function getAllData(): Promise<{
    makes: any;
    years: any;
    transmissions: any;
    bodyTypes: any;
    fuels: any;
    colors: any;
    engine: any;
}> {
    const promises = [
        VehicleService.getMakers({ acceptLanguage: 'en_US' }),
        VehicleService.getYears({ acceptLanguage: 'en_US' }),
        VehicleService.getTransmissions({ acceptLanguage: 'en_US' }),
        VehicleService.getBodyTypes({ acceptLanguage: 'en_US' }),
        VehicleService.getFuels({ acceptLanguage: 'en_US' }),
        VehicleService.getColors({ acceptLanguage: 'en_US' }),
        VehicleService.getEngineTypes({ acceptLanguage: 'en_US' }),
    ];

    // @ts-ignore
    const [makes, years, transmissions, bodyTypes, fuels, colors, engine] = await Promise.all(promises);
    return {
        makes,
        years,
        transmissions,
        bodyTypes,
        fuels,
        colors,
        engine,
    };
}
