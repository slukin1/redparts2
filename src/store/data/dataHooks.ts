// application
import { useAppAction, useAppSelector } from '~/store/hooks';
import { DATA_NAMESPACE } from '~/store/data/dataReducer';
import {
    getAllData,
} from '~/store/data/dataAction';

export const useData = () => useAppSelector((state) => state[DATA_NAMESPACE].current);

export const useGetAllData = () => useAppAction(getAllData);
