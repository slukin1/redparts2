import { IOrderDef } from '~/api/routes/interfaces/order-def';
import { IOrder, IOrderTotal } from '~/interfaces/order';
import { products } from '~/api/routes/database/products';
import { addresses } from '~/api/routes/database/addresses';
import { makeIdGenerator } from '~/api/routes/utils';

export const getNextOrderId = makeIdGenerator();

export function getOrderToken(orderId: number): string {
    const token = 'b84486c31644eac99f6909a6e8c19109';

    return token.slice(0, token.length - orderId.toString().length) + orderId.toString();
}

function makeOrders(defs: IOrderDef[]): IOrder[] {
    return defs.map((def) => {
        const id = getNextOrderId();
        const items = def.items.map((orderItemDef) => {
            const product = products.find((x) => x.slug === orderItemDef.product);

            if (!product) {
                throw new Error('Product not found');
            }

            return {
                product: JSON.parse(JSON.stringify(product)),
                options: orderItemDef.options,
                price: product.price,
                quantity: orderItemDef.quantity,
                total: product.price * orderItemDef.quantity,
            };
        });

        const quantity = items.reduce((acc, item) => acc + item.quantity, 0);
        const subtotal = items.reduce((acc, item) => acc + item.total, 0);

        const totals: IOrderTotal[] = [
            { title: 'SHIPPING', price: 25 },
            { title: 'TAX', price: Math.round(subtotal * 0.2) },
        ];

        const total = subtotal + totals.reduce((acc, x) => acc + x.price, 0);

        return {
            id,
            token: getOrderToken(id),
            number: def.number,
            createdAt: def.createdAt,
            payment: def.payment,
            status: def.status,
            items,
            quantity,
            subtotal,
            totals,
            total,
            shippingAddress: JSON.parse(JSON.stringify(addresses[0])),
            billingAddress: JSON.parse(JSON.stringify(addresses[0])),
        };
    });
}

const ordersDef: IOrderDef[] = [
    {
        number: '9478',
        createdAt: '2020-10-19',
        payment: 'PayPal',
        status: 'PENDING',
        items: [
            {
                product: '6411e1e6de0a743c1d360db4',
                options: [
                    { name: 'Color', value: 'True Red' },
                    { name: 'Material', value: 'Aluminium' },
                ],
                quantity: 2,
            },
            {
                product: '6411e1e5de0a743c1d360db0',
                options: [],
                quantity: 1,
            },
            {
                product: '6411e1e5de0a743c1d360dac',
                options: [
                    { name: 'Color', value: 'Green' },
                ],
                quantity: 3,
            },
        ],
    },
    {
        number: '7592',
        createdAt: '2019-03-28',
        payment: 'PayPal',
        status: 'PENDING',
        items: [
            {
                product: '6411e1e6de0a743c1d360db4',
                options: [
                    { name: 'Color', value: 'True Red' },
                    { name: 'Material', value: 'Aluminium' },
                ],
                quantity: 2,
            },
            {
                product: '6411e1e5de0a743c1d360db0',
                options: [],
                quantity: 1,
            },
        ],
    },
    {
        number: '7192',
        createdAt: '2019-03-15',
        payment: 'PayPal',
        status: 'SHIPPED',
        items: [
            {
                product: '6411e1e5de0a743c1d360dac',
                options: [
                    { name: 'Color', value: 'Green' },
                ],
                quantity: 3,
            },
        ],
    },
    {
        number: '6321',
        createdAt: '2019-02-28',
        payment: 'PayPal',
        status: 'COMPLETED',
        items: [
            {
                product: '6411e1e5de0a743c1d360db0',
                options: [],
                quantity: 1,
            },
        ],
    },
];

export const orders: IOrder[] = makeOrders(ordersDef);

export function getNextOrderNumber(): string {
    return (orders.reduce((prev, curr) => Math.max(prev, parseFloat(curr.number)), 0) + 1).toString();
}
