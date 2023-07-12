export interface IProductAttributesDef {
    [slug: string]: string | string[] | [true, string, ...string[]];
}

export interface IProductDef {
    name: string;
    slug: string;
    sku: string;
    price: number;
    compareAtPrice?: number;
    images: string[];
    badges?: string|string[];
    rating: number;
    reviews: number;
    availability: string;
    brand?: string;
    categories?: string[];
    attributes?: IProductAttributesDef;
    compatibility?: 'all' | 'unknown' | number[];


    idRef: string,
    make: string;
    model: string;
    width: string;
    height: string;
    length: string;
    doors: string;
    location: string;
    bodyType: string;
    fuel: string;
    engineType: string;
    transmission: string;
    mileage: number;
    vehicleWeight: string;
    steering: string;
    condition: string;
}
