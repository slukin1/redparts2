/* eslint-disable import/prefer-default-export,class-methods-use-this */

// application
import { AbstractFilterBuilder } from '~/api/routes/filters/abstract-filter-builder';
import { IColorFilter, IColorFilterItem } from '~/interfaces/filter';
import { IProduct } from '~/interfaces/product';
import { products as dbProducts } from '~/api/routes/database/products';
import { VehicleService } from '~/api/services/allapi';

const colors = [
    { code: 'red', color: '#ff4040' },
    { code: 'orange', color: '#ff8126' },
    { code: 'yellow', color: '#ffd333' },
    { code: 'green', color: '#8fcc14' },
    { code: 'blue', color: '#40bfff' },
    { code: 'indigo', color: '#7766cc' },
    { code: 'violet', color: '#b852cc' },
    { code: 'white', color: '#fff' },
    { code: 'gray', color: '#808080' },
    { code: 'black', color: '#000000' },
    { code: 'pear-green', color: '#becc1f' },
    { code: 'emerald', color: '#47cc5e' },
    { code: 'shamrock', color: '#47cca0' },
    { code: 'shakespeare', color: '#47cccc' },
    { code: 'dark-blue', color: '#3d6dcc' },
    { code: 'purple', color: '#b852cc' },
    { code: 'cerise', color: '#e53981' },
    { code: 'brown', color: '#964B00' },
    { code: 'golden', color: '#DAA520' },
    { code: 'blueNavy', color: '#000080' },
    { code: 'dark', color: '#1A1A1A' },
    { code: 'deep', color: '#2B2281' },
    { code: 'Gray-black', color: '#2F4F4F' },
    { code: 'Gray-green', color: '#808069' },
    { code: 'GrayM', color: '#808080' },
];

export class ColorFilterBuilder extends AbstractFilterBuilder {
    private items: IColorFilterItem[] = [];

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
    async makeItems(products: IProduct[], value: string): Promise<void> {
        // match fetch colors with colors and use those colors
        this.items = colors.map((color) => ({
            slug: color.code,
            name: color.code,
            color: color.color,
            count: 1,
        }));
        this.value = this.parseValue(value);
    }

    // noinspection DuplicatedCode
    calc(filters: AbstractFilterBuilder[]): void {
        this.items = this.items.map((item) => ({
            ...item,
            count: 400,
        }));
    }

    build(): IColorFilter {
        return {
            type: 'color',
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

    private extractItems(product: IProduct): IColorFilterItem[] {
        const attribute = product.attributes.find((x) => x.slug === this.slug);

        if (!attribute) {
            return [];
        }

        return attribute.values.map((value) => ({
            slug: value.slug,
            name: value.name,
            color: this.getColorCode(value.slug),
            count: 0,
        }));
    }

    private getColorCode(slug: string): string {
        return colors.find((x) => x.code === slug)?.color || '#000';
    }
}
