// application
import { IAddressData } from './address';
import { IProduct } from './product';

export interface IOrderItemOption {
    name: string;
    value: string;
}

export interface IOrderItem {
    product: IProduct;
    options: IOrderItemOption[];
    price: number;
    quantity: number;
    total: number;
}

export interface IOrderTotal {
    title: string;
    price: number;
}

export interface IOrder {
    id: number;
    token: string;
    number: string;
    createdAt: string;
    payment: string;
    status: string;
    items: IOrderItem[];
    quantity: number;
    subtotal: number;
    totals: IOrderTotal[];
    total: number;
    shippingAddress: IAddressData;
    billingAddress: IAddressData;
}

interface Address {
    street: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    postcode: string;
    addressType: string;
    country: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
}

export interface Order {
        _id: string;
        orderNumber: number;
        user: User;
        products: Product[];
        shippingAddress: Address;
        billingAddress: Address;
        totalPrice: number;
        isPaid: boolean;
        isDelivered: boolean;
        taxPrice: number;
        shippingPrice: number;
        status: string;
        paidAt: string;
        deliveredAt: string;
        paymentMethod: string;
        paymentStripeId: string;
        paymentPayaplId: string;
        updatedAt: string;
        createdAt: string;
        phone: string;
        email: string;
        message: string;
        trackingUrl: string;
}

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    role: string;
    status: string;
    isEmailVerified: boolean;
    passwordChangedAt: string;
    adddress: Address[];
    companyName: string;
    phone: string;
    profileImage: string;
    profileImageId: string;
    discountCode: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
}

interface Product {
    _id: string;
    name: string;
    slug: boolean;
    sku: string;
    idRef: string;
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
    badges: string;
    reviews: number;
    availability: string;
    brand: string;
    categories: string;
    attributes: string;
    compatibility: number;
    images: string;
    description: string;
    category: string;
    seller: string;
    compareAtPrice: number;
    price: number;
    priceDiscount: number;
    colors: string;
    sizes: string;
    sold: number;
    priceAfterDiscount: number;
    isOutOfStock: boolean;
    rating: number;
}
