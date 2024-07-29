import { createSlice } from '@reduxjs/toolkit';

export const pageNumber = createSlice({
    name: "pageNumberSlice",
    initialState: {
        value: 1,
    },
    reducers: {
        increment: state => {
            state.value += 1;
        },
        decrement: state => {
            state.value -= 1;
        },
        setPageNumber: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { increment, decrement,setPageNumber} = pageNumber.actions;

export default pageNumber.reducer;
