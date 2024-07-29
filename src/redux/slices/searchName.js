import { createSlice } from '@reduxjs/toolkit';

export const searchName = createSlice({
    name: "searchNameSlice",
    initialState: {
        value: "pokemon",
    },
    reducers: {
        setSearchName: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setSearchName } = searchName.actions;

export default searchName.reducer;
