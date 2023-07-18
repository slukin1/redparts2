// application
// suppress all ts
import { error, makePageBasedNavigation } from '~/api/routes/utils';
import { IListOptions, IOrdersList } from '~/interfaces/list';
import { IOrder, Order } from '~/interfaces/order';
import { orders } from '~/api/routes/database/orders';
import { OrderService } from '~/api/services/allapi';
import { JSON1, translateJSON } from '~/api/routes/endpoints/products';

function JsonToOrder(json: Order): {
    quantity: number;
    totals: { price: number; title: string }[];
    token: string;
    number: number;
    createdAt: string;
    total: number;
    subtotal: number;
    shippingAddress: {
        firstName: any;
        lastName: any;
        country: string;
        address: string;
        city: string;
        address2: string;
        phone: any;
        postcode: string;
        email: any
    };
    payment: string;
    id: string;
    billingAddress: {
        firstName: any;
        lastName: any;
        country: string;
        address: string;
        city: string;
        address2: string;
        phone: any;
        postcode: string;
        email: any
    };
    items: { product: JSON1; total: number; quantity: number; price: number; options: any[] }[];
    status: string
} {
    // @ts-ignore
    return {
        // eslint-disable-next-line no-underscore-dangle
        id: json._id,
        // eslint-disable-next-line no-underscore-dangle
        token: json._id,
        number: json.orderNumber,
        createdAt: json.createdAt,
        payment: json.paymentMethod,
        status: json.status,
        items: json.products.map((product) => ({
            product: translateJSON(product),
            options: [],
            price: product.price,
            quantity: 1,
            total: product.price,
        })),
        quantity: json.products.length,
        subtotal: json.products.reduce((acc, product) => acc + product.price, 0),
        totals: json.products.map((product) => ({
            title: product.name,
            price: product.price,
        })),
        total: json.products.reduce((acc, product) => acc + product.price, 0),
        shippingAddress: {
            firstName: json.user.firstName,
            lastName: json.user.lastName,
            country: json.shippingAddress.country,
            city: json.shippingAddress.city,
            address: json.shippingAddress.address1,
            address2: json.shippingAddress.address2,
            postcode: json.shippingAddress.postcode,
            phone: json.user.phone,
            email: json.user.email,
        },
        billingAddress: {
            firstName: json.user.firstName,
            lastName: json.user.lastName,
            country: json.billingAddress.country,
            city: json.billingAddress.city,
            address: json.billingAddress.address1,
            address2: json.billingAddress.address2,
            postcode: json.billingAddress.postcode,
            phone: json.user.phone,
            email: json.user.email,
        },
    };
}

export async function getOrdersList(options?: IListOptions): Promise<IOrdersList> {
    // let items: IOrder[] = JSON.parse(JSON.stringify(orders));
    const limit = options?.limit || 8;
    // @ts-ignore
    let items = await OrderService.getOrders({ accessToken: JSON.parse(localStorage.getItem('Tokens')).accessToken, page: options?.page || 1, limit: limit });
    // @ts-ignore
    items = items?.orders.results.map((item) => JsonToOrder(item));
    console.log(items);
    const sort = options?.sort || 'default';
    // @ts-ignore
    const [chunk, navigation] = makePageBasedNavigation(items, limit, options?.page || 1);
    // @ts-ignore
    items = chunk;
    // @ts-ignore
    return Promise.resolve({
        items,
        sort,
        navigation,
    });
}

export function getOrderById(id: number): Promise<IOrder> {
    const order = orders.find((x) => x.id === id);
    if (order) {
        return Promise.resolve(order);
    }

    return error('Index Not Found');
}

export function getOrderByToken(token: string): Promise<IOrder> {
    const order = orders.find((x) => x.token === token);

    if (order) {
        return Promise.resolve(order);
    }

    return error('Index Not Found');
}
