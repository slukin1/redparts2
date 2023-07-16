/* eslint-disable import/prefer-default-export,class-methods-use-this */

// application
import { AbstractFilterBuilder } from '~/api/routes/filters/abstract-filter-builder';
import { IColorFilter, IColorFilterItem } from '~/interfaces/filter';
import { IProduct } from '~/interfaces/product';
import { products as dbProducts } from '~/api/routes/database/products';
import { VehicleService } from '~/api/services/allapi';

const colors = [
    { code: 'white', color: '#fff' },
    { code: 'silver', color: '#d9d9d9' },
    { code: 'light-gray', color: '#b3b3b3' },
    { code: 'gray', color: '#808080' },
    { code: 'dark-gray', color: '#666' },
    { code: 'coal', color: '#4d4d4d' },
    { code: 'black', color: '#262626' },
    { code: 'red', color: '#ff4040' },
    { code: 'orange', color: '#ff8126' },
    { code: 'yellow', color: '#ffd333' },
    { code: 'pear-green', color: '#becc1f' },
    { code: 'green', color: '#8fcc14' },
    { code: 'emerald', color: '#47cc5e' },
    { code: 'shamrock', color: '#47cca0' },
    { code: 'shakespeare', color: '#47cccc' },
    { code: 'blue', color: '#40bfff' },
    { code: 'dark-blue', color: '#3d6dcc' },
    { code: 'violet', color: '#7766cc' },
    { code: 'purple', color: '#b852cc' },
    { code: 'cerise', color: '#e53981' },
    { code: 'Black', color: '#000000' },
    { code: 'Blue', color: '#0000FF' },
    { code: 'Brown', color: '#964B00' },
    { code: 'Chakime', color: '#A76E09' },
    { code: 'Dark', color: '#1A1A1A' },
    { code: 'Deep', color: '#2B2281' },
    { code: 'Gold', color: '#FFD700' },
    { code: 'Golden', color: '#DAA520' },
    { code: 'Gray', color: '#808080' },
    { code: 'Gray-black', color: '#2F4F4F' },
    { code: 'Gray-green', color: '#808069' },
    { code: 'GrayM', color: '#808080' },
    { code: 'Green', color: '#008000' },
    { code: 'II', color: '#2F4F4F' },
    { code: 'III', color: '#2F4F4F' },
    { code: 'II黄白', color: '#FFD700' },
    { code: 'II黄Ｍ', color: '#FFD700' },
    { code: 'II黒茶', color: '#1A1A1A' },
    { code: 'Ivory', color: '#FFFFF0' },
    { code: 'Kanagime', color: '#964B00' },
    { code: 'Light', color: '#D3D3D3' },
    { code: 'M', color: '#2F4F4F' },
    { code: 'Momo', color: '#FF69B4' },
    { code: 'Momogin', color: '#964B00' },
    { code: 'Navy', color: '#000080' },
    { code: 'Orange', color: '#FFA500' },
    { code: 'Peach', color: '#FFDAB9' },
    { code: 'Pearl', color: '#FFFFFF' },
    { code: 'PearlBlue', color: '#ADD8E6' },
    { code: 'Purple', color: '#800080' },
    { code: 'Red', color: '#FF0000' },
    { code: 'RedOrange', color: '#FF4500' },
    { code: 'Silver', color: '#C0C0C0' },
    { code: 'SilverM', color: '#C0C0C0' },
    { code: 'White', color: '#FFFFFF' },
    { code: 'Yellow', color: '#FFFF00' },
    { code: 'black', color: '#000000' },
    { code: 'blackII', color: '#000000' },
    { code: 'blue', color: '#0000FF' },
    { code: 'blueNavy', color: '#000080' },
    { code: 'brown', color: '#964B00' },
    { code: 'brownWhite', color: '#FFE4C4' },
    { code: 'copper', color: '#B87333' },
    { code: 'dark', color: '#1A1A1A' },
    { code: 'deep', color: '#2B2281' },
    { code: 'gold', color: '#FFD700' },
    { code: 'gray', color: '#808080' },
    { code: 'gray-brown', color: '#964B00' },
    { code: 'gray-green', color: '#808069' },
    { code: 'green', color: '#008000' },
    { code: 'ivory', color: '#FFFFF0' },
    { code: 'light', color: '#D3D3D3' },
    { code: 'navy', color: '#000080' },
    { code: 'orange', color: '#FFA500' },
    { code: 'peach', color: '#FFDAB9' },
    { code: 'pearl', color: '#FFFFFF' },
    { code: 'platinum', color: '#E5E4E2' },
    { code: 'purple', color: '#800080' },
    { code: 'red', color: '#FF0000' },
    { code: 'silver', color: '#C0C0C0' },
    { code: 'tea', color: '#C49A6C' },
    { code: 'white', color: '#FFFFFF' },
    { code: 'white-red', color: '#FFFFFF' },
    { code: 'yellow', color: '#FFFF00' },
    { code: '橙緑', color: '#FFA500' },
    { code: '深桃II', color: '#FF69B4' },
    { code: '深銀Ｍ灰深', color: '#808080' },
    { code: '深銀Ｍ灰Ｍ', color: '#808080' },
    { code: '濃桃II', color: '#FF69B4' },
    { code: '濃橙白', color: '#FFA500' },
    { code: '濃灰灰', color: '#808080' },
    { code: '濃灰白', color: '#D3D3D3' },
    { code: '濃紫II', color: '#800080' },
    { code: '濃緑緑', color: '#008000' },
    { code: '濃茶II', color: '#964B00' },
    { code: '濃薄茶', color: '#964B00' },
    { code: '濃赤茶', color: '#800000' },
    { code: '濃金白', color: '#FFD700' },
    { code: '濃金赤', color: '#FFD700' },
    { code: '濃金黒', color: '#FFD700' },
    { code: '濃黒緑', color: '#1A1A1A' },
    { code: '灰II青', color: '#808080' },
    { code: '灰IIＭ', color: '#808080' },
    { code: '灰桃Ｍ', color: '#FF69B4' },
    { code: '灰深銀', color: '#808080' },
    { code: '灰銀茶', color: '#964B00' },
    { code: '灰銀金', color: '#DAA520' },
    { code: '灰銀青', color: '#808080' },
    { code: '灰青銀', color: '#808080' },
    { code: '灰Ｍ金', color: '#DAA520' },
    { code: '灰Ｍ青', color: '#808080' },
    { code: '白白銀', color: '#FFFFFF' },
    { code: '白薄緑', color: '#D3D3D3' },
    { code: '白薄銀', color: '#D3D3D3' },
    { code: '白金Ｍ', color: '#DAA520' },
    { code: '白黄白', color: '#FFFF00' },
    { code: '白黒橙', color: '#FFA500' },
    { code: '白Ｍ灰', color: '#D3D3D3' },
    { code: '真珠銅', color: '#B87333' },
    { code: '紫黒茶', color: '#800080' },
    { code: '紫黒金', color: '#800080' },
    { code: '紺深', color: '#000080' },
    { code: '紺灰Ｍ', color: '#000080' },
    { code: '紺白Ｍ', color: '#000080' },
    { code: '紺茶', color: '#000080' },
    { code: '紺Ｍ黒', color: '#000080' },
    { code: '緑茶白', color: '#008000' },
    { code: '緑赤茶', color: '#008000' },
    { code: '緑銅', color: '#008000' },
    { code: '緑黄II', color: '#008000' },
    { code: '緑Ｍ深', color: '#008000' },
    { code: '緑Ｍ黒', color: '#008000' },
    { code: '茶II黒', color: '#964B00' },
    { code: '茶桃II', color: '#964B00' },
    { code: '茶濃Ｍ', color: '#964B00' },
    { code: '茶茶II', color: '#964B00' },
    { code: '茶薄灰', color: '#964B00' },
    { code: '薄灰赤', color: '#D3D3D3' },
    { code: '薄灰銀', color: '#D3D3D3' },
    { code: '薄白黄', color: '#FFFFF0' },
    { code: '薄緑茶', color: '#D3D3D3' },
    { code: '薄茶ＭＭ', color: '#964B00' },
    { code: '薄薄', color: '#D3D3D3' },
    { code: '薄金紺', color: '#C0C0C0' },
    { code: '薄金銀', color: '#C0C0C0' },
    { code: '薄金黒', color: '#C0C0C0' },
    { code: '薄銀赤', color: '#C0C0C0' },
    { code: '薄銅白', color: '#B87333' },
    { code: '薄黄茶', color: '#FFFF00' },
    { code: '薄黄黒', color: '#FFFF00' },
    { code: '薄黒白', color: '#1A1A1A' },
    { code: '象牙橙', color: '#FFA500' },
    { code: '赤桃II', color: '#FF69B4' },
    { code: '赤紫青', color: '#800080' },
    { code: '赤黒白', color: '#FF0000' },
    { code: '金桃Ｍ', color: '#FFD700' },
    { code: '金白Ｍ', color: '#FFD700' },
    { code: '金緑', color: '#FFD700' },
    { code: '金銀橙', color: '#FFD700' },
    { code: '金銅茶', color: '#B87333' },
    { code: '銀深', color: '#C0C0C0' },
    { code: '銀灰薄', color: '#C0C0C0' },
    { code: '銀白茶', color: '#C0C0C0' },
    { code: '銀茶II', color: '#964B00' },
    { code: '銀茶Ｍ', color: '#C0C0C0' },
    { code: '銀赤茶', color: '#C0C0C0' },
    { code: '銀青II', color: '#C0C0C0' },
    { code: '銀黒白', color: '#C0C0C0' },
    { code: '銀黒Ｍ', color: '#C0C0C0' },
    { code: '銀Ｍ桃', color: '#C0C0C0' },
    { code: '銀Ｍ濃', color: '#C0C0C0' },
    { code: '銀Ｍ白', color: '#C0C0C0' },
    { code: '銀Ｍ金', color: '#C0C0C0' },
    { code: '銀Ｍ青', color: '#C0C0C0' },
    { code: '銅茶黒', color: '#B87333' },
    { code: '銅金', color: '#B87333' },
    { code: '青III', color: '#0000FF' },
    { code: '青II茶', color: '#0000FF' },
    { code: '青紫黒', color: '#800080' },
    { code: '青紺黒', color: '#000080' },
    { code: '青黄II', color: '#0000FF' },
    { code: '青Ｍ深', color: '#0000FF' },
    { code: '黄木目', color: '#FFFF00' },
    { code: '黄黒黄', color: '#FFFF00' },
    { code: '黒IIＭ', color: '#1A1A1A' },
    { code: '黒深濃', color: '#1A1A1A' },
    { code: '黒白紫', color: '#1A1A1A' },
    { code: '黒紫白', color: '#1A1A1A' },
    { code: '黒紫茶', color: '#1A1A1A' },
    { code: '黒紺青', color: '#1A1A1A' },
    { code: '黒銀灰', color: '#1A1A1A' },
    { code: '黒銅II', color: '#1A1A1A' },
    { code: '黒青紺', color: '#1A1A1A' },
    { code: '黒青銀', color: '#1A1A1A' },
    { code: '黒Ｍ金', color: '#1A1A1A' },
    { code: 'Ｍ薄', color: '#2F4F4F' },

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
