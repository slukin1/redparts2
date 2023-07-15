/* eslint-disable import/prefer-default-export,class-methods-use-this */

// application
import { AbstractFilterBuilder } from '~/api/routes/filters/abstract-filter-builder';
import { IProduct } from '~/interfaces/product';
import { IRangeFilter } from '~/interfaces/filter';
import { products as dbProducts } from '~/api/routes/database/products';

export class RangeFilterBuilder extends AbstractFilterBuilder {
    private min!: number;

    private max!: number;

    private value!: [number, number];

    test(product: IProduct): boolean {
        const value = this.extractValue(product);

        return value >= this.value[0] && value <= this.value[1];
    }

    parseValue(value: string): [number, number] {
        return value.split('-').map((x) => parseFloat(x)) as [number, number];
    }

    makeItems(products: IProduct[], value: string): void {
        if (this.slug === 'year') {
            // maximum year from result list
            // @ts-ignore
            this.min = 1980;
            // minimum year from result list
            // @ts-ignore
            this.max = new Date().getFullYear();
        } else if (this.slug === 'mileage') {
            // maximum mileage from result list
            // @ts-ignore
            this.max = 1000000;
            // minimum mileage from result list
            // @ts-ignore
            this.min = 0;
        } else if (this.slug === 'price') {
            // maximum price from result list
            // @ts-ignore
            this.max = 129_870_129;
            // minimum price from result list
            // @ts-ignore
            this.min = 0;
        } else {
            this.max = dbProducts.reduce((acc, product) => Math.max(acc, this.extractValue(product)), 0);
            this.min = dbProducts.reduce((acc, product) => Math.min(acc, this.extractValue(product)), this.max);
            /** Calculates the number of digits for rounding. */
            const digit = 10 ** Math.max(Math.ceil(this.max).toString().length - 2, 0);

            this.max = Math.ceil(this.max / digit) * digit;
            this.min = Math.floor(this.min / digit) * digit;

            if (this.min === this.max) {
                this.max = Math.floor(this.max / digit + 1) * digit;
            }
        }
        this.value = [this.min, this.max];
        if (value) {
            this.value = this.parseValue(value);
        }
    }

    calc(): void { }

    extractValue(product: IProduct): number {
        if (this.slug === 'price') {
            return product.price;
        }
        if (this.slug === 'mileage') {
            return <number>parseFloat(product.attributes[6].values[0].slug);
        }
        if (this.slug === 'year') {
            return <number>parseFloat(product.attributes[6].values[0].slug);
        }

        throw Error();
    }

    build(): IRangeFilter {
        return {
            type: 'range',
            slug: this.slug,
            name: this.name,
            min: this.min,
            max: this.max,
            value: this.value,
        };
    }
}
