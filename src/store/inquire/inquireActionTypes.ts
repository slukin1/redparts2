// application
import { AppAction } from '~/store/types';
import { IProduct } from '~/interfaces/product';

export const INQUIRE_OPEN = 'INQUIRE_OPEN';
export const INQUIRE_CLOSE = 'INQUIRE_CLOSE';

export interface InquireOpenAction {
    type: typeof INQUIRE_OPEN;
    product: IProduct;
}

export interface InquireCloseAction {
    type: typeof INQUIRE_CLOSE;
}

export type InquireAction =
    InquireOpenAction |
    InquireCloseAction;

export type InquireThunkAction<T = void> = AppAction<InquireAction, T>;
