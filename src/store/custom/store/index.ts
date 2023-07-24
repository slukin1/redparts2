import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import yearsReducer from '~/store/custom/slices/years';

const store = configureStore({
    reducer: {
        years: yearsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
