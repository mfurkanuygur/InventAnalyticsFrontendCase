import { configureStore } from '@reduxjs/toolkit';
import pageNumberReducer from '../slices/pageNumber'
import searchNameReducer from '../slices/searchName'
import movieTypeReducer from '../slices/movieType'
import yearFilterReducer from '../slices/yearFilter'
import dataReducer from '../slices/data'
const store = configureStore({
    reducer: {
        pageNumberSlice: pageNumberReducer,
        searchNameSlice: searchNameReducer,
        movieTypeSlice: movieTypeReducer,
        yearFilterSlice: yearFilterReducer,
        dataSlice: dataReducer,
    },
});

export default store;