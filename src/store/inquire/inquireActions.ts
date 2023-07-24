// application
import { IProduct } from '~/interfaces/product';
import { shopApi } from '~/api';
import {
    INQUIRE_CLOSE,
    INQUIRE_OPEN,
    InquireCloseAction,
    InquireOpenAction,
    InquireThunkAction,
} from './inquireActionTypes';

let cancelPreviousRequest = () => {};

export function inquireOpenSuccess(product: IProduct): InquireOpenAction {
    return {
        type: INQUIRE_OPEN,
        product,
    };
}

export function inquireClose(): InquireCloseAction {
    return {
        type: INQUIRE_CLOSE,
    };
}

export function inquireOpen(productSlug: string): InquireThunkAction<Promise<void>> {
    return (dispatch) => {
        cancelPreviousRequest();
        return new Promise((resolve) => {
            let canceled = false;
            // sending request to server, timeout is used as a stub
            const timer = setTimeout(() => {
                shopApi.getProductBySlug(productSlug).then((product) => {
                    if (canceled) {
                        return;
                    }

                    if (product) {
                        dispatch(inquireOpenSuccess(product));
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
