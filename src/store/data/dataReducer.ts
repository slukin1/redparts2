// application
import { DATA_CURRENT, DataAction } from '~/store/data/dataActionTypes';
import { withClientState } from '~/store/client';
import { USER_NAMESPACE } from '~/store/user/userReducer';

const initialState: any = {
    current: null,
};

export const DATA_NAMESPACE = 'data';

function dataBaseReducer(state = initialState, action: DataAction): any {
    switch (action.type) {
    case DATA_CURRENT:
        return {
            ...state,
            current: action.payload,
        };
    default:
        return state;
    }
}

const dataReducer = withClientState(dataBaseReducer, DATA_NAMESPACE);

export default dataReducer;
