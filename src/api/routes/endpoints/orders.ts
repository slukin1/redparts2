// application
import { error, makePageBasedNavigation } from '~/api/routes/utils';
import { IListOptions, IOrdersList } from '~/interfaces/list';
import { IOrder } from '~/interfaces/order';
import { orders } from '~/api/routes/database/orders';

export function getOrdersList(options?: IListOptions): Promise<IOrdersList> {
    let items: IOrder[] = JSON.parse(JSON.stringify(orders));

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
