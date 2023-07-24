// application
import { IUserState } from '~/store/user/userTypes';
import { USER_SET_CURRENT, UserAction } from '~/store/user/userActionTypes';
import { withClientState } from '~/store/client';

const initialState: IUserState = {
    current: null,
};

export const USER_NAMESPACE = 'user';

function userBaseReducer(state = initialState, action: UserAction): IUserState {
    switch (action.type) {
    case USER_SET_CURRENT:
        return {
            ...state,
            current: action.payload,
        };
    default:
        return state;
    }
}

const userReducer = withClientState(userBaseReducer, USER_NAMESPACE);

export default userReducer;
