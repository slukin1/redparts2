// application
import { WHATSAPP_CLOSE, WHATSAPP_OPEN, WhatsappAction } from './whatsappActionTypes';
import { IWhatsappState } from '~/store/whatsapp/whatsappTypes';

const initialState: IWhatsappState = {
    open: false,
    product: null,
};

export const WHATSAPP_NAMESPACE = 'whatsapp';

export default function whatsappReducer(state = initialState, action: WhatsappAction) {
    let newState = state;

    if (action.type === WHATSAPP_OPEN) {
        newState = {
            ...state,
            open: true,
            product: JSON.parse(JSON.stringify(action.product)),
        };
    } else if (action.type === WHATSAPP_CLOSE) {
        newState = {
            ...state,
            open: false,
        };
    }

    return newState;
}
