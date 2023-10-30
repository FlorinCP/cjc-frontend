// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import sharedWeekReducer from '../features/sharedWeekSlice';
import sharedDisplayedWeekReducer from '../features/sharedDisplayedWeekSlice'
import sharedTodayReducer from "../features/sharedTodaySlice";
import sharedSelectedDayReducer from "../features/sharedSelectedDay";

export const store = configureStore({
    reducer: {
        sharedWeek: sharedWeekReducer,
        sharedDisplayedWeek : sharedDisplayedWeekReducer,
        sharedToday : sharedTodayReducer,
        sharedSelectedDay: sharedSelectedDayReducer
    },
});
