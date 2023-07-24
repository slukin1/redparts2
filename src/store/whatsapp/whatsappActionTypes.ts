// application
import { AppAction } from '~/store/types';
import { IProduct } from '~/interfaces/product';

export const WHATSAPP_OPEN = 'WHATSAPP_OPEN';
export const WHATSAPP_CLOSE = 'WHATSAPP_CLOSE';

export interface WhatsappOpenAction {
    type: typeof WHATSAPP_OPEN;
    product: IProduct;
}

export interface WhatsappCloseAction {
    type: typeof WHATSAPP_CLOSE;
}

export type WhatsappAction =
    WhatsappOpenAction |
    WhatsappCloseAction;

export type WhatsappThunkAction<T = void> = AppAction<WhatsappAction, T>;
