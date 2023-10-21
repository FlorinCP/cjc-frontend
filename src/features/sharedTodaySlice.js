import { createSlice } from "@reduxjs/toolkit";

export const sharedToday = createSlice({
  name: "today",
  initialState: {
    today: {
      monthNumber: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      dayNumber: new Date().getDate(),
    },
  },
  reducers: {
    setToday: (state, action) => {
      const { monthNumber, year, dayNumber } = action.payload;
      state.today = {
        monthNumber,
        year,
        dayNumber,
      };
    },
    resetToday: (state) => {
      state.today = {
        monthNumber: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        dayNumber: new Date().getDate(),
      };
    },
  },
});

export const { setToday, resetToday } = sharedToday.actions;

export default sharedToday.reducer;
