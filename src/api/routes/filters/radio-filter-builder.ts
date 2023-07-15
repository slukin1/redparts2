/* eslint-disable import/prefer-default-export,class-methods-use-this */

// application
import { AbstractFilterBuilder } from '~/api/routes/filters/abstract-filter-builder';
import { IBaseFilterItem, IRadioFilter } from '~/interfaces/filter';
import { IProduct } from '~/interfaces/product';
import { VehicleService } from '~/api/services/allapi';
import { getDataFromLocalStorage } from '~/api/routes/endpoints';

export class RadioFilterBuilder extends AbstractFilterBuilder {
    private items: IBaseFilterItem[] = [];

    private value: string | null = null;

    test(product: IProduct): boolean {
        return this.value !== null && this.extractItems(product).map((x) => x.slug).includes(this.value);
    }

    async makeItems(products: IProduct[], value: string): Promise<void> {
        let response;
        let filterFunction;
        let mappingFunction;
        let sortingFunction;
        const limitFunction = (x: any, index: number) => index < 10;
        const filterOutUndefinedNullEmpty = (value: any) => value !== undefined && value !== null && value !== '';

        const replaceSpacesWithUnderscore = (value: string) => (value.includes(' ') ? value.split(' ').join('_') : value);

        switch (this.slug) {
        case 'maker':
            if (typeof window !== 'undefined') {
                // Perform localStorage action
                response = await getDataFromLocalStorage('makes');
            } else {
                response = await VehicleService.getMakers({ acceptLanguage: 'en-US' });
            }
            filterFunction = (x: { make: string }) => filterOutUndefinedNullEmpty(x.make);
            mappingFunction = (x: { make: string; total: any }) => ({
                slug: replaceSpacesWithUnderscore(x.make),
                name: x.make,
                count: x.total,
            });
            // a sorting function that sorts based on the total number of items
            sortingFunction = (a: { count: number }, b: { count: number }) => b.count - a.count;
            break;
        case 'bodyType':
            if (typeof window !== 'undefined') {
                // Perform localStorage action
                response = await getDataFromLocalStorage('bodyTypes');
            } else {
                response = await VehicleService.getBodyTypes({ acceptLanguage: 'en-US' });
            }
            filterFunction = (x: { bodyType: string }) => filterOutUndefinedNullEmpty(x.bodyType);
            mappingFunction = (x: { bodyType: string; total: any }) => ({
                slug: replaceSpacesWithUnderscore(x.bodyType),
                name: x.bodyType,
                count: x.total,
            });
            // a sorting function that sorts based on the total number of items
            sortingFunction = (a: { count: number }, b: { count: number }) => b.count - a.count;
            break;
        case 'engineType':
            if (typeof window !== 'undefined') {
                // Perform localStorage action
                response = await getDataFromLocalStorage('engine');
            } else {
                response = await VehicleService.getEngineTypes({ acceptLanguage: 'en-US' });
            }
            filterFunction = filterOutUndefinedNullEmpty;
            mappingFunction = (x: string) => ({
                slug: replaceSpacesWithUnderscore(x),
                name: x,
                count: 1,
            });
            // a sorting function that sorts based on the name
            sortingFunction = (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name);
            break;
        case 'transmission':
            if (typeof window !== 'undefined') {
                // Perform localStorage action
                response = await getDataFromLocalStorage('transmissions');
            } else {
                response = await VehicleService.getTransmissions({ acceptLanguage: 'en-US' });
            }
            filterFunction = filterOutUndefinedNullEmpty;
            mappingFunction = (x: string) => ({
                slug: replaceSpacesWithUnderscore(x),
                name: x,
                count: 1,
            });
            // a sorting function that sorts based on the name
            sortingFunction = (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name);
            break;
        case 'fuel':
            if (typeof window !== 'undefined') {
                // Perform localStorage action
                response = await getDataFromLocalStorage('fuels');
            } else {
                response = await VehicleService.getFuels({ acceptLanguage: 'en-US' });
            }
            filterFunction = filterOutUndefinedNullEmpty;
            mappingFunction = (x: string) => ({
                slug: replaceSpacesWithUnderscore(x),
                name: x,
                count: 1,
            });
            // a sorting function that sorts based on the name
            sortingFunction = (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name);
            break;
        default:
            response = [];
            filterFunction = () => false;
            mappingFunction = () => ({});
        }
        this.items = response.results
            .filter(filterFunction)
            .map(mappingFunction)
            .sort(sortingFunction)
            .filter(limitFunction);
        // a limit function that no matter how many items in the array, it will only return the first 10
        this.items = this.items.filter(limitFunction);
        this.items.unshift({ slug: 'any', name: 'Any', count: 1 });
        this.value = value || this.items[0].slug;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    calc(filters: AbstractFilterBuilder[]): void {
        this.items = this.items.map((item) => {
            if (item.count) {
                return {
                    ...item,
                    count: item.count,
                };
            }
            return {
                ...item,
                count: 1,
            };
        });
    }

    build(): IRadioFilter {
        return {
            type: 'radio',
            slug: this.slug,
            name: this.name,
            items: this.items,
            value: this.value,
        };
    }

    private extractItems(product: IProduct): IBaseFilterItem[] {
        if (this.slug === 'discount') {
            const items: IBaseFilterItem[] = [
                { slug: 'any', name: 'Any', count: 0 },
            ];

            if (product.compareAtPrice) {
                items.push({ slug: 'yes', name: 'Yes', count: 0 });
            } else {
                items.push({ slug: 'no', name: 'No', count: 0 });
            }

            return items;
        }
        if (this.slug === 'maker') {
            return product.brand ? [{
                slug: product.brand.slug,
                name: product.brand.name,
                count: 0,
            }] : [];
        }
        if (this.slug === 'bodyType') {
            return product.attributes[3] ? [{
                slug: product.attributes[3].values[0].slug,
                name: product.attributes[3].values[0].name,
                count: 0,
            }] : [];
        }
        if (this.slug === 'engineType') {
            return product.attributes[2] ? [{
                slug: product.attributes[2].values[0].slug,
                name: product.attributes[2].values[0].name,
                count: 0,
            }] : [];
        }
        throw Error();
    }
}
