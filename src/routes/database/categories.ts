// application
import { ICategoryDef } from '~/routes/interfaces/category-def';
import { makeIdGenerator } from '~/routes/utils';
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
            { name: 'Toyota', slug: JSON.stringify({ filter_maker: 'Toyota'.toUpperCase() }) },
            { name: 'Honda', slug: JSON.stringify({ filter_maker: 'Honda'.toUpperCase() }) },
            { name: 'Suzuki', slug: JSON.stringify({ filter_maker: 'Suzuki'.toUpperCase() }) },
            { name: 'Nissan', slug: JSON.stringify({ filter_maker: 'Nissan'.toUpperCase() }) },
            { name: 'Daihatsu', slug: JSON.stringify({ filter_maker: 'Daihatsu'.toUpperCase() }) },
            { name: 'Mazda', slug: JSON.stringify({ filter_maker: 'Mazda'.toUpperCase() }) },
            { name: 'Subaru', slug: JSON.stringify({ filter_maker: 'Subaru'.toUpperCase() }) },
            { name: 'Isuzu', slug: JSON.stringify({ filter_maker: 'Isuzu'.toUpperCase() }) },
        ],
    },
    {
        name: 'Price',
        slug: 'fuel-system',
        image: '/images/categories/category-2.jpg',
        items: 356,
        children: [
            { name: 'under $1,000', slug: JSON.stringify({ filter_price: '0-77000' }) },
            { name: '$1,000 ~ $1,500', slug: JSON.stringify({ filter_price: '77000-115500' }) },
            { name: '$1,500 ~ $2,000', slug: JSON.stringify({ filter_price: '115500-154000' }) },
            { name: '$2,000 ~ $3,000', slug: JSON.stringify({ filter_price: '154000-231000' }) },
            { name: '$3,000 ~ $4,000', slug: JSON.stringify({ filter_price: '231000-308000' }) },
            { name: '$4,000 ~ $5,000', slug: JSON.stringify({ filter_price: '308000-385000' }) },
            { name: '$5,000 ~ $6,000', slug: JSON.stringify({ filter_price: '385000-462000' }) },
            { name: 'Over $6,000', slug: JSON.stringify({ filter_price: '462000-129870129' }) },
        ],
    },
    {
        name: 'Body Type',
        slug: 'body-parts',
        image: '/images/categories/category-3.jpg',
        items: 54,
        children: [
            { name: 'Sedan', slug: JSON.stringify({ filter_bodyType: 'Sedan' }) },
            { name: 'SUV', slug: JSON.stringify({ filter_bodyType: 'SUV' }) },
            { name: 'Coupe', slug: JSON.stringify({ filter_bodyType: 'Coupe' }) },
            { name: 'Minivan', slug: JSON.stringify({ filter_bodyType: 'Minivan' }) },
            { name: 'Hatchback', slug: JSON.stringify({ filter_bodyType: 'Hatchback' }) },
            { name: 'Convertible', slug: JSON.stringify({ filter_bodyType: 'Convertible' }) },
            { name: 'Truck', slug: JSON.stringify({ filter_bodyType: 'Truck' }) },
            { name: 'Mini', slug: JSON.stringify({ filter_bodyType: 'Mini' }) },
            { name: 'Bus', slug: JSON.stringify({ filter_bodyType: 'Bus' }) },
        ],
    },
    {
        name: 'Mileages',
        slug: 'interior-parts',
        image: '/images/categories/category-4.jpg',
        items: 274,
        children: [
            { name: '- 10000km', slug: JSON.stringify({ filter_mileage: '0-10000' }) },
            { name: '10000 - 30000km', slug: JSON.stringify({ filter_mileage: '10000-30000' }) },
            { name: '30000 - 50000km', slug: JSON.stringify({ filter_mileage: '30000-50000' }) },
            { name: '50000 - 100000km', slug: JSON.stringify({ filter_mileage: '50000-100000' }) },
            { name: '100000 - 1500000km', slug: JSON.stringify({ filter_mileage: '100000-1500000' }) },
            { name: '150000 - 200000km', slug: JSON.stringify({ filter_mileage: '150000-200000' }) },
            { name: '200000 - 300000km', slug: JSON.stringify({ filter_mileage: '200000-300000' }) },
            { name: '300000km - ', slug: JSON.stringify({ filter_mileage: '300000-1000000' }) },
        ],

    },
    {
        name: 'Years',
        slug: 'tires-wheels',
        image: '/images/categories/category-5.jpg',
        items: 508,
        children: [
            { name: '1994 and older', slug: JSON.stringify({ filter_year: `1994-${new Date().getFullYear()}` }) },
            { name: '2004 and newer', slug: JSON.stringify({ filter_year: `2004-${new Date().getFullYear()}` }) },
            { name: '2007 and newer', slug: JSON.stringify({ filter_year: `2007-${new Date().getFullYear()}` }) },
            { name: '2010 and newer', slug: JSON.stringify({ filter_year: `2010-${new Date().getFullYear()}` }) },
            { name: '2012 and newer', slug: JSON.stringify({ filter_year: `2012-${new Date().getFullYear()}` }) },
            { name: '2015 and newer', slug: JSON.stringify({ filter_year: `2015-${new Date().getFullYear()}` }) },
            { name: '2020 and newer', slug: JSON.stringify({ filter_year: `2020-${new Date().getFullYear()}` }) },
        ],

    },
    {
        name: 'Engine',
        slug: 'engine-drivetrain',
        image: '/images/categories/category-6.jpg',
        items: 95,
        children: [
            { name: 'Gasoline', slug: JSON.stringify({ filter_engineType: 'Gasoline' }) },
            { name: 'Hybrid', slug: JSON.stringify({ filter_engineType: 'Hybrid' }) },
            { name: 'Diesel', slug: JSON.stringify({ filter_engineType: 'Diesel' }) },
            { name: 'Electric', slug: JSON.stringify({ filter_engineType: 'Electric' }) },
            { name: 'Other', slug: JSON.stringify({ filter_engineType: 'Other' }) },
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
