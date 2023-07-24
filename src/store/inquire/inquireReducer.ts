// application
import { INQUIRE_CLOSE, INQUIRE_OPEN, InquireAction } from './inquireActionTypes';
import { IInquireState } from '~/store/inquire/inquireTypes';

const initialState: IInquireState = {
    open: false,
    product: null,
};

export const INQUIRE_NAMESPACE = 'inquire';

export default function inquireReducer(state = initialState, action: InquireAction) {
    let newState = state;

    if (action.type === INQUIRE_OPEN) {
        newState = {
            ...state,
            open: true,
            product: JSON.parse(JSON.stringify(action.product)),
        };
    } else if (action.type === INQUIRE_CLOSE) {
        newState = {
            ...state,
            open: false,
        };
    }

    return newState;
}
