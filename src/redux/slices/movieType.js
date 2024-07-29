import { createSlice } from '@reduxjs/toolkit';

export const movieType = createSlice({
    name: "movieTypeSlice",
    initialState: {
        value: "null",
    },
    reducers: {
        setMovieType: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setMovieType } = movieType.actions;

export default movieType.reducer;
