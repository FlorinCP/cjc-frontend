// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import sharedWeekReducer from '../features/sharedWeekSlice';
import sharedDisplayedWeekReducer from '../features/sharedDisplayedWeekSlice'

export const store = configureStore({
    reducer: {
        sharedWeek: sharedWeekReducer,
        sharedDisplayedWeek : sharedDisplayedWeekReducer
    },
});
