// application
import { IProduct } from '~/interfaces/product';
import { shopApi } from '~/api';
import {
    WHATSAPP_CLOSE,
    WHATSAPP_OPEN,
    WhatsappCloseAction,
    WhatsappOpenAction,
    WhatsappThunkAction,
} from './whatsappActionTypes';

let cancelPreviousRequest = () => {};

export function whatsappOpenSuccess(product: IProduct): WhatsappOpenAction {
    return {
        type: WHATSAPP_OPEN,
        product,
    };
}

export function whatsappClose(): WhatsappCloseAction {
    return {
        type: WHATSAPP_CLOSE,
    };
}

export function whatsappOpen(productSlug: string): WhatsappThunkAction<Promise<void>> {
    return (dispatch) => {
        cancelPreviousRequest();
        return new Promise((resolve) => {
            console.log('whatsappOpen', productSlug);
            let canceled = false;
            // sending request to server, timeout is used as a stub
            const timer = setTimeout(() => {
                shopApi.getProductBySlug(productSlug).then((product) => {
                    if (canceled) {
                        return;
                    }

                    if (product) {
                        dispatch(whatsappOpenSuccess(product));
                    }

                    resolve();
                });
            }, 250);

            cancelPreviousRequest = () => {
                canceled = true;
                clearTimeout(timer);
                resolve();
            };
        });
    };
}
