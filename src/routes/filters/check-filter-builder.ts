/* eslint-disable import/prefer-default-export,class-methods-use-this */

// application
import { AbstractFilterBuilder } from '~/routes/filters/abstract-filter-builder';
import { IBaseFilterItem, ICheckFilter } from '~/interfaces/filter';
import { IProduct } from '~/interfaces/product';
import { products as dbProducts } from '~/routes/database/products';

export class CheckFilterBuilder extends AbstractFilterBuilder {
    private items: IBaseFilterItem[] = [];

    private value: string[] = [];

    test(product: IProduct): boolean {
        if (this.value.length === 0) {
            return true;
        }

        return this.value.reduce<boolean>((result, value) => (
            result || this.extractItems(product).map((x) => x.slug).includes(value)
        ), false);
    }

    // noinspection DuplicatedCode
    makeItems(products: IProduct[], value: string): void {
        if (this.slug === 'maker') {
            this.items = [
                { slug: 'ABARTH', name: 'ABARTH', count: 1 },
                { slug: 'ALFA ROMEO', name: 'ALFA ROMEO', count: 1 },
                { slug: 'AUDI', name: 'AUDI', count: 1 },
                { slug: 'BMW', name: 'BMW', count: 1 },
                { slug: 'CADILLAC', name: 'CADILLAC', count: 1 },
                { slug: 'CHEVROLET', name: 'CHEVROLET', count: 1 },
                { slug: 'CITROEN', name: 'CITROEN', count: 1 },
                { slug: 'DAIHATSU', name: 'DAIHATSU', count: 1 },
                { slug: 'FIAT', name: 'FIAT', count: 1 },
                { slug: 'FORD', name: 'FORD', count: 1 },
                { slug: 'HONDA', name: 'HONDA', count: 1 },
                { slug: 'JEEP', name: 'JEEP', count: 1 },
                { slug: 'LEXUS', name: 'LEXUS', count: 1 },
                { slug: 'MAZDA', name: 'MAZDA', count: 1 },
                { slug: 'MERCEDES AMG', name: 'MERCEDES AMG', count: 1 },
                { slug: 'MERCEDES BENZ', name: 'MERCEDES BENZ', count: 1 },
                { slug: 'MINI', name: 'MINI', count: 1 },
                { slug: 'MITSUBISHI', name: 'MITSUBISHI', count: 1 },
                { slug: 'NISSAN', name: 'NISSAN', count: 1 },
                { slug: 'PEUGEOT', name: 'PEUGEOT', count: 1 },
                { slug: 'PORSCHE', name: 'PORSCHE', count: 1 },
                { slug: 'RENAULT', name: 'RENAULT', count: 1 },
                { slug: 'SMART', name: 'SMART', count: 1 },
                { slug: 'SUBARU', name: 'SUBARU', count: 1 },
                { slug: 'SUZUKI', name: 'SUZUKI', count: 1 },
                { slug: 'TOYOTA', name: 'TOYOTA', count: 1 },
                { slug: 'VOLKSWAGEN', name: 'VOLKSWAGEN', count: 1 },
                { slug: 'VOLVO', name: 'VOLVO', count: 1 },
            ];
        } else if (this.slug === 'bodyType') {
            this.items = [
                { slug: 'Coupe', name: 'Coupe', count: 1 },
                { slug: 'Crocan SUV', name: 'Crocan SUV', count: 1 },
                { slug: 'Hatchback', name: 'Hatchback', count: 1 },
                { slug: 'Minivan', name: 'Minivan', count: 1 },
                { slug: 'Open', name: 'Open', count: 1 },
                { slug: 'Pick-up truck', name: 'Pick-up truck', count: 1 },
                { slug: 'Sedan', name: 'Sedan', count: 1 },
                { slug: 'Station Wagon', name: 'Station Wagon', count: 1 },
                { slug: 'Truck', name: 'Truck', count: 1 },
            ];
        } else if (this.slug === 'engineType') {
            this.items = [
                { slug: 'Diesel', name: 'Diesel', count: 1 },
                { slug: 'Gasoline', name: 'Gasoline', count: 1 },
                { slug: 'Hybrid', name: 'Hybrid', count: 1 },
            ];
        } else {
            products.forEach((product) => this.extractItems(product).forEach((item) => {
                if (!this.items.find((x) => x.slug === item.slug)) {
                    this.items.push(item);
                }
            }));
        }
        this.value = this.parseValue(value);
    }

    // noinspection DuplicatedCode
    calc(filters: AbstractFilterBuilder[]): void {
        // const products = dbProducts.filter(
        //     (product) => filters.reduce<boolean>(
        //         (isMatched, filter) => (isMatched && (filter === this || filter.test(product))),
        //         true,
        //     ),
        // );

        this.items = this.items.map((item) => ({
            ...item,
            count: 1,
            //     products.reduce((acc, product) => (
            //     acc + (this.extractItems(product).map((x) => x.slug).includes(item.slug) ? 1 : 0)
            // ), 0),
        }));
    }

    build(): ICheckFilter {
        return {
            type: 'check',
            slug: this.slug,
            name: this.name,
            items: this.items,
            value: this.value,
        };
    }

    // noinspection JSMethodCanBeStatic
    private parseValue(value: string): string[] {
        return value ? value.split(',') : [];
    }

    private extractItems(product: IProduct): IBaseFilterItem[] {
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
