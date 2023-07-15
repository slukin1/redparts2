// application
import { vehicleApi } from '~/api';
import { DATA_CURRENT, DataCurrentAction, DataThunkAction } from '~/store/data/dataActionTypes';

export function dataSetCurrent(data: any | null): DataCurrentAction {
    return {
        type: DATA_CURRENT,
        payload: data,
    };
}

export function getAllData(): DataThunkAction<Promise<void>> {
    return (dispatch) => (
        vehicleApi.getAllData().then((data:any) => {
            localStorage.setItem('allData', JSON.stringify(data));
            dispatch(dataSetCurrent(data));
        })
    );
}
