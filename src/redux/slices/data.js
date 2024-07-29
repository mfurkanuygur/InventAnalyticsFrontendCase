import { createSlice } from '@reduxjs/toolkit';

export const data = createSlice({
    name: "movieTypeSlice",
    initialState: {
        value: null,
    },
    reducers: {
        setData: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setData } = data.actions;

export default data.reducer;
