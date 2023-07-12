// application
import { IVehicle } from '~/interfaces/vehicle';
import { makeIdGenerator } from '~/routes/utils';
import { IVehicleDef } from '~/routes/interfaces/vehicle-def';
import { data } from './data';

const getNextId = makeIdGenerator();

function makeVehicles(defs: IVehicleDef[]): IVehicle[] {
    return defs.length ? defs.map((def) => {
        const range = typeof def.modelYear === 'number' ? [def.modelYear, def.modelYear] : def.modelYear;
        const years = [];

        for (let i = range[0]; i <= range[1]; i += 1) {
            years.push(i);
        }

        return years.map((year) => ({
            id: getNextId(),
            year,
            make: def.make,
            model: def.model,
            engine: def.engineType,
        }));
    }).reduce((acc, v) => [...acc, ...v], [])
        : [];
}

const vehiclesDef: IVehicleDef[] = [...data];

export const vehicles: IVehicle[] = makeVehicles(vehiclesDef);

export const userVehicles: IVehicle[] = vehicles.slice(0, 3);

// const vehiclesDef: IVehicleDef[] = [
//     {
//         year: 2011,
//         make: 'Ford',
//         model: 'Focus S',
//         engine: '2.0L 1742DA L4 FI Turbo',
//     },
//     {
//         year: 2019,
//         make: 'Audi',
//         model: 'Q7 Premium',
//         engine: '3.0L 5626CC L6 QK',
//     },
// ]
