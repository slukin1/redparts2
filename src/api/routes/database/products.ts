/* eslint-disable import/prefer-default-export */

// application
import { brands } from '~/api/routes/database/brands';
import { IBrand } from '~/interfaces/brand';
import { IProduct, IProductAttribute } from '~/interfaces/product';
import { IShopCategory } from '~/interfaces/category';
import { makeIdGenerator, nameToSlug } from '~/api/routes/utils';
import { prepareCategory } from '~/api/routes/endpoints/categories';
import { IProductAttributesDef, IProductDef } from '~/api/routes/interfaces/product-def';
import { shopCategoriesList } from '~/api/routes/database/categories';
import { data } from './data';
import { BodyType } from '~/interfaces/body-type';
import { IVehicleDef } from '../interfaces/vehicle-def';

const getNextId = makeIdGenerator();

function resolveProductAttributesDef(attributesDef: IProductAttributesDef): IProductAttribute[] {
    const attributes: IProductAttribute[] = [];
    const keys = Object.keys(attributesDef);

    for (let i = 0; i < keys.length; i += 1) {
        const attributeName = keys[i];
        const attribute: IProductAttribute = {
            name: attributeName,
            slug: nameToSlug(attributeName),
            featured: false,
            values: [],
        };

        const valuesDef = attributesDef[attributeName];
        let valueNames: string[] = [];

        if (typeof valuesDef === 'string') {
            valueNames = [valuesDef];
        } else {
            if (valuesDef[0] === true) {
                attribute.featured = true;
                valuesDef.splice(0, 1);
            }

            valueNames = valuesDef as string[];
        }

        valueNames.forEach((valueName) => {
            attribute.values.push({
                name: valueName,
                slug: nameToSlug(valueName),
            });
        });

        if (attribute.values.length > 0) {
            attributes.push(attribute);
        }
    }

    return attributes;
}

function makeProducts(defs: IProductDef[]): IProduct[] {
    return defs.map((def) => {
        let badges: string[] = [];

        if (def.badges) {
            if (typeof def.badges === 'string') {
                badges = [def.badges];
            } else {
                badges = def.badges.slice(0);
            }
        }

        let brand: IBrand = {
            slug: 'OTHER',
            name: 'OTHER',
            image: '',
            country: 'JP',
        };

        if (def.make) {
            brand = brands.find((x) => x.name.toUpperCase() === def.make) || brand;
        }

        let bodyType: BodyType = {
            slug: 'OTHER',
            name: 'OTHER',
            image: '',
            country: 'JP',
        };

        if (def.bodyType) {
            bodyType = brands.find((x) => x.name === def.bodyType) || bodyType;
        }

        const categorySlugs: string[] = def.categories || ['tools-garage'];
        const categories = categorySlugs
            .map((categorySlug) => shopCategoriesList.find((x) => x.slug === categorySlug))
            .map((x) => (x ? prepareCategory(x) : null))
            .filter((x) => x !== null) as IShopCategory[];

        const attributesDef: IProductAttributesDef = {
            Make: [true, def.make],
            Model: [true, def.model],
            'Engine Type': [true, def.engineType],
            'Body Type': [true, def.bodyType],
            Transmission: [true, def.transmission],
            Fuel: [true, def.fuel],
            Mileage: [true, String(def.mileage)],
            Doors: [true, String(def.doors)],
            Length: def.length,
            Width: def.width,
            Height: def.height,
        };

        return {
            id: getNextId(),
            name: def.name,
            excerpt: `
               NOTICE: Please contact us for detailed information about total cost and shipping.
            `,
            description: `
                <p>
                </p>
                <h4>NOTICE</h4>
                <p>
                    If you do not find your favourite car from our stock list, don't hesitate to send us your car requirements via the link below, we will recommend you some options.
                </p>
            `,
            slug: def.slug,
            sku: def.sku,
            partNumber: def.idRef,
            location: def.location,
            stock: 'in-stock',
            price: def.price,
            compareAtPrice: def.compareAtPrice || null,
            images: def.images.slice(0),
            badges,
            rating: def.rating,
            reviews: def.reviews,
            availability: def.availability,
            compatibility: def.compatibility || 'all',
            brand,
            bodyType,
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
                        attributes: [
                            'length',
                            'width',
                            'height',
                        ],
                    },
                ],
            },
            attributes: resolveProductAttributesDef(
                {
                    ...attributesDef,
                    ...def.attributes,
                },
            ),
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
                    values: [
                        { slug: 'white', name: 'White', color: '#fff' },
                        { slug: 'yellow', name: 'Yellow', color: '#ffd333' },
                        { slug: 'red', name: 'Red', color: '#ff4040' },
                        { slug: 'blue', name: 'Blue', color: '#4080ff' },
                    ],
                },
            ],
            tags: ['sedan', 'minivan', 'SUV', 'hatchback', 'coupe', 'convertible', 'truck'],
            categories,
            customFields: {},
        };
    });
}

function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function makeProductsDef(items: IVehicleDef[]): IProductDef[] {
    const itemList = items.length ? items.map((x) => ({
        name: `${x.make} ${x.model} ${x.modelYear}`,
        slug: x._id,
        sku: `JPNC0O${x.itemId}`,
        partNumber: x._id,
        price: x.salePrice,
        images: x.picture,
        rating: randomIntFromInterval(4, 5),
        reviews: randomIntFromInterval(500, 800),

        // option
        badges: ['sale', 'new', 'hot'],
        availability: 'in-stock',
        compatibility: [1, 2],
        attributes: {
            Color: x.color,
        },

        // added
        idRef: x._id,
        make: x.make,
        model: x.model,
        width: x.width,
        height: x.height,
        length: x.length,
        doors: x.doors,
        location: x.location,
        mileage: x.mileage,
        bodyType: x.bodyType,
        fuel: x.fuel,
        engineType: x.engineType,
        transmission: x.transmission,
        vehicleWeight: x.vehicleWeight,
        steering: x.steering,
        condition: x.condition,
    }))
        : [];

    return itemList;
}

const items: IVehicleDef[] = [...data];

const productsDef: IProductDef[] = makeProductsDef(items);

export const products: IProduct[] = makeProducts(productsDef);

// const productsDef: IProductDef[] = [
//     {
//         name: 'Brandix Spark Plug Kit ASR-400',
//         slug: 'brandix-spark-plug-kit-asr-400',
//         sku: '140-10440-B',
//         price: 19,
//         images: [
//             '/images/products/product-1-1.jpg',
//             '/images/products/product-1-2.jpg',
//         ],
//         badges: ['sale', 'new', 'hot'],
//         rating: 4,
//         reviews: 3,
//         availability: 'in-stock',
//         compatibility: [1, 2],
//         attributes: {
//             Color: 'White',
//         },
//     },
//     {
//         name: 'Brandix Brake Kit BDX-750Z370-S',
//         slug: 'brandix-brake-kit-bdx-750z370-s',
//         sku: '573-23743-C',
//         price: 224,
//         images: [
//             '/images/products/product-2-1.jpg',
//             '/images/products/product-2-2.jpg',
//         ],
//         rating: 5,
//         reviews: 22,
//         availability: 'in-stock',
//         compatibility: [1],
//         attributes: {
//             Color: 'Silver',
//         },
//     },
// ];
