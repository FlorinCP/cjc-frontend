import { createSlice } from '@reduxjs/toolkit';
import {useMonthDays} from "../hooks/useMonthDays";


// const {navigationArray,currentWeekIndex}  = useMonthDays();

export const sharedDisplayedWeekSlice = createSlice({
    name: 'sharedDisplayedWeek',
    initialState: {
        value :[]
    },
    reducers: {
        setDisplayedWeekValue: (state, action) => {
            state.value = action.payload
        },
    },
});

export const { setDisplayedWeekValue } = sharedDisplayedWeekSlice.actions;

export default sharedDisplayedWeekSlice.reducer;
