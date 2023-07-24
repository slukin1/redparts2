// application
import { AppAction } from '~/store/types';

export const DATA_CURRENT = 'DATA_CURRENT';

export interface DataCurrentAction {
    type: typeof DATA_CURRENT;
    payload: any | null;
}

export type DataAction = DataCurrentAction;

export type DataThunkAction<T = void> = AppAction<DataAction, T>;
