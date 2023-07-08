// application
import { ICategoryDef } from '~/fake-server/interfaces/category-def';
import { makeIdGenerator } from '~/fake-server/utils';
import {
    IBaseCategory,
    IBlogCategory,
    ICategory,
    IShopCategory,
} from '~/interfaces/category';

const getNextId = makeIdGenerator();

function makeShopCategory(def: ICategoryDef, parent: IShopCategory | null): IShopCategory {
    return {
        id: getNextId(),
        type: 'shop',
        name: def.name,
        slug: def.slug,
        image: def.image || null,
        items: def.items,
        parent,
        children: [],
        layout: def.layout ? def.layout : 'products',
        customFields: {},
    };
}

function makeBlogCategory(def: ICategoryDef, parent: IBlogCategory | null): IBlogCategory {
    return {
        id: getNextId(),
        type: 'blog',
        name: def.name,
        slug: def.slug,
        image: def.image || null,
        items: def.items,
        parent,
        children: [],
        customFields: {},
    };
}

function makeCategories<T extends IBaseCategory>(
    makeFn: (def: ICategoryDef, parent: T | null) => T,
    defs: ICategoryDef[],
    parent: T | null = null,
): T[] {
    const categories: T[] = [];

    defs.forEach((def) => {
        const category: T = makeFn(def, parent);

        if (def.children) {
            category.children = makeCategories(makeFn, def.children, category);
        }

        categories.push(category);
    });

    return categories;
}

function flatTree<T extends ICategory>(categories: T[]): T[] {
    let result: T[] = [];

    categories.forEach((category) => {
        result = [...result, category, ...flatTree(category.children as T[])];
    });

    return result;
}

const shopCategoriesDef: ICategoryDef[] = [
    {
        name: 'Make',
        slug: 'headlights-lighting',
        image: '/images/categories/category-1.jpg',
        items: 131,
        children: [
            { name: 'Toyota', slug: 'turn-signals' },
            { name: 'Honda', slug: 'fog-lights' },
            { name: 'Suzuki', slug: 'headlights' },
            { name: 'Nissan', slug: 'switches-relays' },
            { name: 'Daihatsu', slug: 'tail-lights' },
            { name: 'Mazda', slug: 'corner-lights' },
            { name: 'Subaru', slug: 'off-road-lighting' },
            { name: 'Isuzu', slug: 'lighting-accessories' },
        ],
    },
    {
        name: 'Price',
        slug: 'fuel-system',
        image: '/images/categories/category-2.jpg',
        items: 356,
        children: [
            { name: 'under $1,000', slug: 'fuel-pumps' },
            { name: '$1,000 ~ $1,500', slug: 'motor-oil' },
            { name: '$1,500 ~ $2,000', slug: 'gas-caps' },
            { name: '$2,000 ~ $3,000', slug: 'fuel-injector' },
            { name: '$3,000 ~ $4,000', slug: 'control-motor' },
        ],
    },
    {
        name: 'Body Type',
        slug: 'body-parts',
        image: '/images/categories/category-3.jpg',
        items: 54,
        children: [
            { name: 'Sedan', slug: 'bumpers' },
            { name: 'SUV', slug: 'hoods' },
            { name: 'Coupe', slug: 'grilles' },
            { name: 'Minivan', slug: 'fog-lights' },
            { name: 'Hatchback', slug: 'door-handles' },
            { name: 'Convertible', slug: 'door-handles' },
            { name: 'Truck', slug: 'door-handles' },
            { name: 'Mini', slug: 'door-handles' },
            { name: 'Bus', slug: 'door-handles' },
        ],
    },
    {
        name: 'Mileages',
        slug: 'interior-parts',
        image: '/images/categories/category-4.jpg',
        items: 274,
        children: [
            { name: '- 10000km', slug: 'dashboards' },
            { name: '10000 - 30000km', slug: 'seat-covers' },
            { name: '30000 - 50000km', slug: 'floor-mats' },
            { name: '50000 - 100000km', slug: 'sun-shades' },
            { name: '100000 - 1500000km', slug: 'visors' },
            { name: '150000 - 200000km', slug: 'car-covers' },
            { name: '200000 - 300000km', slug: 'interior-parts-accessories' },
            { name: '300000km - ', slug: 'interior-parts-accessories' },
        ],
    },
    {
        name: 'Years',
        slug: 'tires-wheels',
        image: '/images/categories/category-5.jpg',
        items: 508,
        children: [
            { name: '1994 and older', slug: 'wheel-covers' },
            { name: '2004 and newer', slug: 'brake-kits' },
            { name: '2007 and newer', slug: 'tire-chains' },
            { name: '2010 and newer', slug: 'wheel-disks' },
            { name: '2012 and newer', slug: 'tires' },
            { name: '2015 and newer', slug: 'sensors' },
            { name: '2020 and newer', slug: 'tires-wheels-accessories' },
        ],
    },
    {
        name: 'Engine',
        slug: 'engine-drivetrain',
        image: '/images/categories/category-6.jpg',
        items: 95,
        children: [
            { name: 'Gasoline', slug: 'timing-belts' },
            { name: 'Hybrid', slug: 'spark-plugs' },
            { name: 'Diesel', slug: 'oil-pans' },
            { name: 'Engine Gaskets', slug: 'engine-gaskets' },
            { name: 'Electric', slug: 'oil-filters' },
            { name: 'Other', slug: 'engine-mounts' },
            { name: '-', slug: 'engine-drivetrain-accessories' },
        ],
    },
    // {
    //     name: 'Oils & Lubricants',
    //     slug: 'oils-lubricants',
    //     image: '/images/categories/category-7.jpg',
    //     items: 179,
    // },
    // {
    //     name: 'Tools & Garage',
    //     slug: 'tools-garage',
    //     image: '/images/categories/category-8.jpg',
    //     items: 106,
    // },
];

const blogCategoriesDef: ICategoryDef[] = [
    {
        name: 'Latest News',
        slug: 'latest-news',
    },
    {
        name: 'Special Offers',
        slug: 'special-offers',
        children: [
            {
                name: 'Spring Sales',
                slug: 'spring-sales',
            },
            {
                name: 'Summer Sales',
                slug: 'summer-sales',
            },
            {
                name: 'Autumn Sales',
                slug: 'autumn-sales',
            },
            {
                name: 'Christmas Sales',
                slug: 'christmas-sales',
            },
            {
                name: 'Other Sales',
                slug: 'other-sales',
            },
        ],
    },
    {
        name: 'New Arrivals',
        slug: 'new-arrivals',
    },
    {
        name: 'Reviews',
        slug: 'reviews',
    },
    {
        name: 'Wheels & Tires',
        slug: 'wheels-tires',
    },
    {
        name: 'Engine & Drivetrain',
        slug: 'engine-drivetrain',
    },
    {
        name: 'Transmission',
        slug: 'transmission',
    },
    {
        name: 'Performance',
        slug: 'performance',
    },
];

export const shopCategoriesTree: IShopCategory[] = makeCategories(makeShopCategory, shopCategoriesDef);

export const shopCategoriesList: IShopCategory[] = flatTree(shopCategoriesTree);

export const blogCategoriesTree: IBlogCategory[] = makeCategories(makeBlogCategory, blogCategoriesDef);

export const blogCategoriesList: IBlogCategory[] = flatTree(blogCategoriesTree);
