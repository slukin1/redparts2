'use client';

// application
import { AbstractFilterBuilder } from '~/routes/filters/abstract-filter-builder';
// import { CategoryFilterBuilder } from '~/routes/filters/category-filter-builder';
// import { CheckFilterBuilder } from '~/routes/filters/check-filter-builder';
import { ColorFilterBuilder } from '~/routes/filters/color-filter-builder';
import { getNextReviewId, reviews } from '~/routes/database/reviews';
import { IProduct } from '~/interfaces/product';
import { IReview } from '~/interfaces/review';
import { prepareCategory } from '~/routes/endpoints/categories';
import { products as dbProducts } from '~/routes/database/products';
import { RadioFilterBuilder } from '~/routes/filters/radio-filter-builder';
import { RangeFilterBuilder } from '~/routes/filters/range-filter-builder';
// import { RatingFilterBuilder } from '~/routes/filters/rating-filter-builder';
import { shopCategoriesList } from '~/routes/database/categories';
// import { VehicleFilterBuilder } from '~/routes/filters/vehicle-filter-builder';
import {
    clone,
    delayResponse,
    error,
    makePageBasedNavigation,
} from '~/routes/utils';
import {
    ICursorBasedNavigation,
    IFilterValues,
    IListOptions,
    INavigation, IPageBasedNavigation,
    IReviewsList,
} from '~/interfaces/list';
import {
    IAddProductReviewData,
    IGetSearchSuggestionsOptions,
    IGetSearchSuggestionsResult,
} from '~/api/base';
import { VehicleService } from '~/services/allapi';
import {
    IBaseFilter, IBaseFilterItem,
    ICategoryFilterValue,
    ICheckFilterValue, IColorFilterItem, IColorFilterValue, IRadioFilterValue,
    IRangeFilterValue, IRatingFilterItem, IRatingFilterValue,
    IVehicleFilterValue,
} from '~/interfaces/filter';
import { IShopCategory } from '~/interfaces/category';
import { IVehicle } from '~/interfaces/vehicle';

interface JSON1 {
    id: number;
    name: string;
    excerpt: string;
    description: string;
    slug: string;
    sku: string;
    partNumber: string;
    location: string;
    stock: string;
    price: number;
    compareAtPrice: null | number;
    images: string[];
    badges: string[];
    rating: number;
    reviews: number;
    availability: string;
    compatibility: number[];
    brand: {
        name: string;
        slug: string;
        country: string;
        image: string;
    };
    bodyType: {
        slug: string;
        name: string;
        image: string;
        country: string;
    };
    type: {
        slug: string;
        name: string;
        attributeGroups: {
            name: string;
            slug: string;
            attributes: string[];
        }[];
    };
    attributes: {
        name: string;
        slug: string;
        featured: boolean;
        values: {
            name: string;
            slug: string;
        }[];
    }[];
    options: {
        type: string;
        slug: string;
        name: string;
        values: {
            slug: string;
            name: string;
            color?: string;
        }[];
    }[];
    tags: string[];
    categories: string[];
    customFields: {};
}

interface JSON2 {
    _id: string;
    site: number;
    itemId: string;
    price: number;
    make: string;
    makeEn: string;
    createdAt: string;
    picture: string[];
    mileage: number;
    model: string;
    planA: number;
    planB: number;
    repairHistory: string;
    specification: any[];
    title: string;
    offerPrice: string;
    salePrice: number;
    status: string;
    updatedAt: string | null;
    deletedAt: string | null;
    url: string;
    inspectionMonth: number;
    inspectionYear: number;
    modelYear: number;
    pageNo: number;
    mfgData: string;
    mfgYear: number;
    regYear: number;
    regMonth: number;
    chassisNo: string;
    width: string;
    height: string;
    length: string;
    m3: string;
    doors: string;
    seatCapacity: number;
    location: string;
    fuel: string;
    color: string;
    wheelDrive: string;
    bodyType: string;
    engineType: string;
    transmission: string;
    wheelbase: string;
    vehicleWeight: string;
    indoor: string;
    JC08FuelEconomy: string;
    WLTCFuelEconomy: string;
    minimumTurningRadius: string;
    numberOfSheetRows: string;
    steering: string;
    condition: string;
    refNo: string;
    __v: number;
    id: string;
}
function translateJSON(json2: JSON2): JSON1 {
    const json1 = {
        // eslint-disable-next-line no-underscore-dangle
        id: json2._id || '',
        name: `${json2.make} ${json2.model} ${json2.modelYear}` || '',
        excerpt: '',
        description: '',
        // eslint-disable-next-line no-underscore-dangle
        slug: json2._id || '',
        sku: json2.itemId || '',
        // eslint-disable-next-line no-underscore-dangle
        partNumber: json2._id || '',
        location: json2.location || '',
        stock: json2.status || '',
        price: json2.price || '',
        compareAtPrice: null,
        images: json2.picture || '',
        badges: ['sale'],
        rating: 5,
        reviews: 0,
        availability: json2.status || '',
        compatibility: [],
        brand: {
            name: json2.make || '',
            slug: json2.make || '',
            country: '',
            image: '',
        },
        bodyType: {
            slug: json2.bodyType || '',
            name: json2.bodyType || '',
            image: '',
            country: '',
        },
        type: {
            slug: 'default',
            name: 'Default',
            attributeGroups: [
                {
                    name: 'General',
                    slug: 'general',
                    attributes: [
                        'make',
                        'model',
                        'transmission',
                        'engine-type',
                        'body-type',
                        'mileage',
                        'fuel',
                        'doors',
                    ],
                },
                {
                    name: 'Dimensions',
                    slug: 'dimensions',
                    attributes: ['length', 'width', 'height'],
                },
            ],
        },
        attributes: [
            {
                name: 'Make',
                slug: 'make',
                featured: true,
                values: [{ name: json2.make || '', slug: json2.make || '' }],
            },
            {
                name: 'Model',
                slug: 'model',
                featured: true,
                values: [{ name: json2.model || '', slug: json2.model || '' }],
            },
            {
                name: 'Engine Type',
                slug: 'engine-type',
                featured: true,
                values: [{ name: json2.engineType || '', slug: json2.engineType || '' }],
            },
            {
                name: 'Body Type',
                slug: 'body-type',
                featured: true,
                values: [{ name: json2.bodyType || '', slug: json2.bodyType || '' }],
            },
            {
                name: 'Transmission',
                slug: 'transmission',
                featured: true,
                values: [{ name: json2.transmission || '', slug: json2.transmission || '' }],
            },
            {
                name: 'Fuel',
                slug: 'fuel',
                featured: true,
                values: [{ name: json2.fuel || '', slug: json2.fuel || '' }],
            },
            {
                name: 'Mileage',
                slug: 'mileage',
                featured: true,
                values: [{ name: json2.mileage?.toString() || '', slug: json2.mileage?.toString() || '' }],
            },
            {
                name: 'Doors',
                slug: 'doors',
                featured: true,
                values: [{ name: json2.doors || '', slug: json2.doors || '' }],
            },
            {
                name: 'Length',
                slug: 'length',
                featured: false,
                values: [{ name: json2.length || '', slug: json2.length || '' }],
            },
            {
                name: 'Width',
                slug: 'width',
                featured: false,
                values: [{ name: json2.width || '', slug: json2.width || '' }],
            },
            {
                name: 'Height',
                slug: 'height',
                featured: false,
                values: [{ name: json2.height || '', slug: json2.height || '' }],
            },
            {
                name: 'Color',
                slug: 'color',
                featured: false,
                values: [{ name: json2.color || '', slug: json2.color || '' }],
            },
        ],
        options: [
            {
                type: 'default',
                slug: 'material',
                name: 'Material',
                values: [
                    { slug: 'steel', name: 'Steel' },
                    { slug: 'aluminium', name: 'Aluminium' },
                    { slug: 'thorium', name: 'Thorium' },
                ],
            },
            {
                type: 'color',
                slug: 'color',
                name: 'Color',
                values: [{ slug: json2.color || '', name: json2.color || '' }],
            },
        ],
        tags: [],
        categories: [],
        customFields: {},
    };

    // @ts-ignore
    return json1;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getProducts(shift: number, categorySlug: string | null = null): IProduct[] {
    let shiftValue = shift;

    switch (categorySlug) {
    case 'tires-wheels':
    case 'power-tools': shiftValue += 5; break;
    case 'interior-parts':
    case 'hand-tools': shiftValue += 10; break;
    case 'engine-drivetrain':
    case 'plumbing': shiftValue += 15; break;
    default:
    }

    return [...dbProducts.slice(shiftValue), ...dbProducts.slice(0, shiftValue)];
}

export async function getProductsList(
    options: IListOptions = {},
    filterValues: IFilterValues = {},
): Promise<{
    navigation: ICursorBasedNavigation | IPageBasedNavigation;
    sort: string;
    filters: ((IBaseFilter<'category', ICategoryFilterValue> & {
        items: IShopCategory[]
    }) | (IBaseFilter<'vehicle', IVehicleFilterValue> & {
        vehicle: IVehicle | null
    }) | (IBaseFilter<'range', IRangeFilterValue> & {
        min: number;
        max: number
    }) | (IBaseFilter<'check', ICheckFilterValue> & {
        items: IBaseFilterItem[]
    }) | (IBaseFilter<'radio', IRadioFilterValue> & {
        items: IBaseFilterItem[]
    }) | (IBaseFilter<'rating', IRatingFilterValue> & {
        items: IRatingFilterItem[]
    }) | (IBaseFilter<'color', IColorFilterValue> & { items: IColorFilterItem[] }))[];
    products: IProduct[]
}> {
    const filters: AbstractFilterBuilder[] = [
        new RangeFilterBuilder('year', 'Year'),
        new RangeFilterBuilder('price', 'Price'),
        new RangeFilterBuilder('mileage', 'Mileage'),
        new RadioFilterBuilder('bodyType', 'Body Type'),
        new RadioFilterBuilder('maker', 'Brand'),
        new RadioFilterBuilder('engineType', 'Engine'),
        // new RadioFilterBuilder('discount', 'With Discount'),
        // new RatingFilterBuilder('rating', 'Rating'),
        new RadioFilterBuilder('transmission', 'Transmission'),
        new RadioFilterBuilder('fuel', 'Fuel'),
        new ColorFilterBuilder('color', 'Color'),
    ];
    let products = dbProducts.slice(0);
    const validFilters = filters.filter((filter) => filterValues[filter.slug] !== undefined && filterValues[filter.slug].length > 0);
    const filterValuesToPrint: any = {};
    validFilters.forEach((filter) => {
        if (filter.slug in filterValues) {
            filterValuesToPrint[filter.slug] = filterValues[filter.slug];
        }
    });
    const replaceUnderscoreWithSpace = (value: string | undefined): string | undefined => (value?.includes('_') ? value.split('_').join(' ') : value);
    filterValuesToPrint.maker = replaceUnderscoreWithSpace(filterValuesToPrint.maker);
    filterValuesToPrint.bodyType = replaceUnderscoreWithSpace(filterValuesToPrint.bodyType);
    filterValuesToPrint.engineType = replaceUnderscoreWithSpace(filterValuesToPrint.engineType);
    filterValuesToPrint.transmission = replaceUnderscoreWithSpace(filterValuesToPrint.transmission);
    filterValuesToPrint.fuel = replaceUnderscoreWithSpace(filterValuesToPrint.fuel);
    filterValuesToPrint.color = replaceUnderscoreWithSpace(filterValuesToPrint.color);
    filterValuesToPrint.limit = options?.limit || 16;
    filterValuesToPrint.offset = options?.page ? (options.page - 1) * filterValuesToPrint.limit : 0;

    const response = await VehicleService.filterVehicle(filterValuesToPrint);
    // await Promise.all(filters.map(async (filter) => {
    //     await filter.makeItems(products, filterValues[filter.slug]);
    // }));
    async function processFilters() {
        // eslint-disable-next-line no-restricted-syntax
        for (const filter of filters) {
            // eslint-disable-next-line no-await-in-loop
            await filter.makeItems(products, filterValues[filter.slug]);
        }
    }

    await processFilters();

    filters.forEach((filter) => filter.calc(filters));
    products = products.filter((product) => filters.reduce<boolean>((mr, filter) => mr && filter.test(product), true));
    const sort = options?.sort || 'default';
    // @ts-ignore
    products = response?.results.map((vehicle: JSON2) => translateJSON(vehicle));
    // @ts-ignore
    const total = response.total.totalItems;
    products = products.sort((a, b) => {
        if (['name_asc', 'name_desc'].includes(sort)) {
            if (a.name === b.name) {
                return 0;
            }

            return (a.name > b.name ? 1 : -1) * (sort === 'name_asc' ? 1 : -1);
        }

        return 0;
    });

    // General
    const limit = options?.limit || 16;
    let result: [IProduct[], INavigation];
    const temp = Array.from({ length: total }, (_, i) => i + 1);
    // eslint-disable-next-line prefer-const
    // @ts-ignore
    // eslint-disable-next-line prefer-const
    result = makePageBasedNavigation(temp, limit, options?.page || 1);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, navigation] = result;
    // @ts-ignore
    return delayResponse(Promise.resolve({
        items: products,
        sort,
        navigation,
        filters: filters.map((x) => x.build()),
    }), 350);
}

export async function getProductBySlug(slug: string): Promise<IProduct> {
    let product = await VehicleService.getVehicleApi({ id: slug });
    // @ts-ignore
    product = translateJSON(product.vehicle);
    if (!product) {
        return error('Index Not Found');
    }

    return Promise.resolve(clone(product));
}

export function getProductReviews(productId: number, options?: IListOptions): Promise<IReviewsList> {
    let items = reviews.slice(0);

    items.sort((a, b) => {
        if (a.date > b.date) {
            return -1;
        }
        if (a.date < b.date) {
            return 1;
        }

        return 0;
    });

    const limit = options?.limit || 8;
    const sort = options?.sort || 'default';

    // Cursor based navigation
    // const [chunk, navigation] = makeCursorBasedNavigation(
    //     items,
    //     limit,
    //     options?.after,
    //     options?.before,
    //     (review) => review.id.toString(),
    // );
    // Index based navigation
    const [chunk, navigation] = makePageBasedNavigation(items, limit, options?.page || 1);

    items = chunk;

    return Promise.resolve({
        items,
        sort,
        navigation,
    });
}

export function addProductReview(productId: number, data: IAddProductReviewData): Promise<IReview> {
    const review: IReview = {
        id: getNextReviewId(),
        date: (new Date()).toISOString().substr(0, 10),
        author: data.author,
        avatar: '/images/avatars/avatar-2.jpg',
        rating: data.rating,
        content: data.content,
    };

    reviews.push(review);

    return delayResponse(Promise.resolve(review));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getProductAnalogs(productId: number): Promise<IProduct[]> {
    const slugs: string[] = [
        'sunset-brake-kit',
        'specter-brake-kit',
        'brake-kit',
    ];
    const analogs: IProduct[] = dbProducts.filter((x) => slugs.includes(x.slug));

    return Promise.resolve(clone(analogs));
}

export async function getRelatedProducts(productId: number, limit: number): Promise<IProduct[]> {
    const response = await VehicleService.getVehicles({});
    // @ts-ignore
    const products = response?.results.map((vehicle: JSON2) => translateJSON(vehicle));
    // @ts-ignore
    return Promise.resolve(clone(products.slice(0, limit)));
}

export async function getFeaturedProducts(categorySlug: string | null, limit: number): Promise<IProduct[]> {
    const response = await VehicleService.getVehicles({});
    // @ts-ignore
    const products = response?.results.map((vehicle: JSON2) => translateJSON(vehicle));
    // @ts-ignore
    return Promise.resolve(clone(products.slice(0, limit)));
    // return delayResponse(Promise.resolve(clone(getProducts(0, categorySlug).slice(0, limit))), 1000);
}

export async function getPopularProducts(categorySlug: string | null, limit: number): Promise<IProduct[]> {
    const response = await VehicleService.getVehicles({});
    // @ts-ignore
    const products = response?.results.map((vehicle: JSON2) => translateJSON(vehicle));
    // @ts-ignore
    return Promise.resolve(clone(products.slice(0, limit)));
    // return delayResponse(Promise.resolve(clone(getProducts(6, categorySlug).slice(0, limit))), 1000);
}

export async function getTopRatedProducts(categorySlug: string | null, limit: number): Promise<IProduct[]> {
    const response = await VehicleService.getVehicles({});
    // @ts-ignore
    const products = response?.results.map((vehicle: JSON2) => translateJSON(vehicle));
    // @ts-ignore
    return Promise.resolve(clone(products.slice(0, limit)));
    // return delayResponse(Promise.resolve(clone(getProducts(12, categorySlug).slice(0, limit))), 1000);
}

export async function getSpecialOffers(limit: number): Promise<IProduct[]> {
    const response = await VehicleService.getVehicles({});
    // @ts-ignore
    const products = response?.results.map((vehicle: JSON2) => translateJSON(vehicle));
    // @ts-ignore
    return Promise.resolve(clone(products.slice(0, limit)));
    // return delayResponse(Promise.resolve(clone(getProducts(8).slice(0, limit))), 1000);
}

export async function getLatestProducts(limit: number): Promise<IProduct[]> {
    const response = await VehicleService.getVehicles({});
    // @ts-ignore
    const products = response?.results.map((vehicle: JSON2) => translateJSON(vehicle));
    // @ts-ignore
    return Promise.resolve(clone(products.slice(0, limit)));
    // return Promise.resolve(clone(dbProducts.slice(0, limit)));
}

export function getSearchSuggestions(
    query: string,
    options?: IGetSearchSuggestionsOptions,
): Promise<IGetSearchSuggestionsResult> {
    const queryVal = query.toLowerCase();
    const optionsVal = {
        limitProducts: 4,
        limitCategories: 4,
        ...options,
    };

    const resultProducts = dbProducts.filter((x) => x.name.toLowerCase().includes(queryVal));
    const resultCategories = shopCategoriesList.filter((x) => x.name.toLowerCase().includes(queryVal));

    return Promise.resolve({
        products: resultProducts.slice(0, optionsVal.limitProducts),
        categories: resultCategories.slice(0, optionsVal.limitCategories).map((x) => prepareCategory(x)),
    });
}
