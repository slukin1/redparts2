// react
import { useEffect, useRef, useState } from 'react';
// third-party
import { useIntl } from 'react-intl';
// application
import { IVehicle } from '~/interfaces/vehicle';
import { vehicleApi } from '~/api';

interface VehicleSelectItemDef<T = any> {
    key: string;
    label: string;
    placeholder: string;
    optionsSource: (...args: any[]) => Promise<T[]>;
    serializeOptionFn?: (option: T, item: VehicleSelectItem<T>) => string;
    deserializeOptionFn?: (value: string, item: VehicleSelectItem<T>) => T;
}

interface VehicleSelectItem<T = any> extends VehicleSelectItemDef<T> {
    value: string;
    loading: boolean;
    options: T[];
    disabled: boolean,
}

function makeItems(itemsDef: VehicleSelectItemDef[]): VehicleSelectItem[] {
    return itemsDef.map((itemDef, index) => ({
        ...itemDef,
        value: 'none',
        loading: false,
        options: [],
        disabled: index !== 0,
    }));
}

function getItemValue(item: VehicleSelectItem): any {
    const { value: itemValue } = item;

    if (itemValue !== 'none' && item.deserializeOptionFn) {
        return item.deserializeOptionFn(itemValue, item);
    }

    return itemValue;
}

function getItemValues(items: VehicleSelectItem[]): any[] {
    return items.reduce<any[]>((acc, prevItem) => [...acc, getItemValue(prevItem)], []);
}

function serializeOption(option: any, item: VehicleSelectItem): string {
    if (item.serializeOptionFn) {
        return item.serializeOptionFn(option, item);
    }

    return option;
}

function deserializeOption<T extends any>(option: string, item: VehicleSelectItem<T>): T {
    if (item.deserializeOptionFn) {
        return item.deserializeOptionFn(option, item);
    }

    return option as any;
}

interface IOptions {
    onChange?: (vehicle: IVehicle | null) => void;
}

export default function useVehicleForm(options: IOptions = {}) {
    const intl = useIntl();
    const { onChange } = options;
    const cancelPrevRequestRef = useRef(() => {});
    const [items, setItems] = useState(makeItems([

        {
            key: 'brand',
            label: 'Maker',
            placeholder: 'Select Maker',
            optionsSource: vehicleApi.getMakes.bind(vehicleApi),
        },
        {
            key: 'model',
            label: 'Model',
            placeholder: 'Select Model',
            optionsSource: vehicleApi.getModels.bind(vehicleApi),
        },
        {
            key: 'yearFrom',
            label: 'Year from',
            placeholder: 'Select Year from',
            optionsSource: vehicleApi.getYearsFrom.bind(vehicleApi),
            serializeOptionFn: (option: number) => option.toString(),
            deserializeOptionFn: (option: string) => parseFloat(option),
        },
        {
            key: 'yearTo',
            label: 'Year to',
            placeholder: 'Select Year to',
            optionsSource: vehicleApi.getYearsTo.bind(vehicleApi),
            serializeOptionFn: (option: number) => option.toString(),
            deserializeOptionFn: (option: string) => parseFloat(option),
        },
        {
            key: 'mileage',
            label: 'Mileage',
            placeholder: 'Select Mileage',
            optionsSource: vehicleApi.getMileage.bind(vehicleApi),
        },
        {
            key: 'engineType',
            label: 'Engine',
            placeholder: 'Select Engine',
            optionsSource: vehicleApi.getEngine.bind(vehicleApi),
        },
        {
            key: 'transmission',
            label: 'Transmission',
            placeholder: 'Select Transmission',
            optionsSource: vehicleApi.getTransmission.bind(vehicleApi),
        },
        {
            key: 'bodyType',
            label: 'Body',
            placeholder: 'Select Body',
            optionsSource: vehicleApi.getBodyType.bind(vehicleApi),
        },
    ]));

    const load = async (items: VehicleSelectItem[], index: number) => {
        cancelPrevRequestRef.current();

        let canceled = false;
        cancelPrevRequestRef.current = () => {
            canceled = true;
        };

        setItems((prevItems) => [
            ...prevItems.map((prevItem, prevItemIdx) => (
                prevItemIdx !== index ? prevItem : {
                    ...prevItem,
                    loading: true,
                }
            )),
        ]);

        const item = items[index];
        const args = getItemValues(items.slice(0, index));

        let optionsSource = Promise.resolve<any[]>([]);

        if (args.length === 0 || args.slice().pop() !== 'none') {
            optionsSource = item.optionsSource(...args);
        }

        const options = await optionsSource;

        if (canceled) {
            return;
        }

        setItems((prevItems) => [
            ...prevItems.map((prevItem, prevItemIdx) => (
                prevItemIdx !== index ? prevItem : {
                    ...prevItem,
                    options,
                    loading: false,
                }
            )),
        ]);
    };

    const onItemValueChange = (index: number, value: string): void => {
        const nextItemIdx = index + 1;

        setItems((prevItems) => {
            let resultItems = prevItems;

            resultItems = [
                ...resultItems.map(
                    (prevItem, prevItemIdx) => (prevItemIdx !== index ? prevItem : {
                        ...prevItem,
                        value,
                    }),
                ),
            ];

            resultItems = [
                ...resultItems.map(
                    (prevItem, prevItemIdx) => (prevItemIdx <= index ? prevItem : {
                        ...prevItem,
                        value: 'none',
                        options: [],
                        disabled: true,
                    }),
                ),
            ];

            if (value !== 'none' && resultItems[nextItemIdx]) {
                resultItems = [
                    ...resultItems.map(
                        (prevItem, prevItemIdx) => (prevItemIdx !== nextItemIdx ? prevItem : {
                            ...prevItem,
                            disabled: false,
                        }),
                    ),
                ];
            }

            return resultItems;
        });

        if (value === 'none') {
            if (onChange) {
                onChange(null);
            }
        } else if (!items[nextItemIdx] && onChange) {
            onChange(deserializeOption<IVehicle>(value, items[index] as VehicleSelectItem<IVehicle>));
        }
    };

    // Load items.
    useEffect(() => {
        let prevValue = null;

        for (let i = 0; i < items.length; i += 1) {
            const item = items[i];

            if (prevValue !== 'none' && item.options.length === 0 && !item.loading) {
                load(items, i).then();

                return;
            }

            prevValue = item.value;
        }
    }, [items]);

    return {
        items,
        onItemValueChange,
        serializeOption,
    };
}
