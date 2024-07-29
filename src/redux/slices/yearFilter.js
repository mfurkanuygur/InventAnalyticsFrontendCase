import { createSlice } from '@reduxjs/toolkit';

export const yearFilter = createSlice({
    name: "yearFilterSlice",
    initialState: {
        value: "null",
    },
    reducers: {
        setYearNumber: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setYearNumber } = yearFilter.actions;

export default yearFilter.reducer;
