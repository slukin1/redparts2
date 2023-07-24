import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface YearsState {
    resultsYear: any[];
}

const initialState: YearsState = {
    resultsYear: [],
};

const yearsSlice = createSlice({
    name: 'years',
    initialState,
    reducers: {
        updateResults: (state, action: PayloadAction<any[]>) => {
            // eslint-disable-next-line no-param-reassign
            state.resultsYear = action.payload;
        },
    },
});

export const { updateResults } = yearsSlice.actions;
export default yearsSlice.reducer;
