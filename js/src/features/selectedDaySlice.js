import { createSlice } from "@reduxjs/toolkit";

export const selectedDaySlice = createSlice({
  name: "selectedDay",
    initialState: {
        selectedDay: {
        monthNumber: null,
        year: null,
        dayNumber: null,
        },
    },reducers: {
        setSelectedDay: (state, action) => {
            const { monthNumber, year, dayNumber } = action.payload;
            state.selectedDay = {
                monthNumber,
                year,
                dayNumber,
            };
        },
        resetSelectedDay: (state) => {
            state.selectedDay = {
                monthNumber: null,
                year: null,
                dayNumber: null,
            };
        },
    },
});

export const { setSelectedDay, resetSelectedDay } = selectedDaySlice.actions;

export default selectedDaySlice.reducer;
