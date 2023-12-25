import {createSlice} from "@reduxjs/toolkit";

export const CurrentWeekSlice = createSlice({
    name: "currentWeek",
    initialState: {
        currentWeek: {
            days: [],
            startTime: null,
            endTime: null,
        },
    },
    reducers: {
        setCurrentWeek: (state, action) => {
            const { days, startTime, endTime } = action.payload;
            state.currentWeek.days = days;
            state.currentWeek.startTime = startTime;
            state.currentWeek.endTime = endTime;
        },
        resetCurrentWeek: (state) => {
            state.currentWeek = {
                days: [],
                startTime: null,
                endTime: null,
            }
        },
    },
});

export const {setCurrentWeek, resetCurrentWeek} = CurrentWeekSlice.actions;

export default CurrentWeekSlice.reducer;
