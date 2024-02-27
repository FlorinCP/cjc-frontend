import { createSlice } from "@reduxjs/toolkit";

export const monthDaysSlice = createSlice({
  name: "monthDays",
  initialState: {
    monthDays: [],
  },
  reducers: {
    setMonthDays: (state, action) => {
      state.monthDays = action.payload;
    },
    updateMonthDay: (state, action) => {

      const {
        dayNumber,
        monthNumber,
        fullYear,
        workingStatus,
        workingHours,
        startHour,
        endHour,
      } = action.payload;

      const weekIndex = state.monthDays.findIndex((week) =>
        week.some(
          (day) =>
            day.dayNumber === dayNumber &&
            day.monthNumber === monthNumber &&
            day.fullYear === fullYear,
        ),
      );

      const dayIndex = state.monthDays[weekIndex].findIndex(
        (day) =>
          day.dayNumber === dayNumber &&
          day.monthNumber === monthNumber &&
          day.fullYear === fullYear,
      );

      state.monthDays[weekIndex][dayIndex] = {
        dayNumber: dayNumber,
        monthNumber: monthNumber,
        fullYear: fullYear,
        workingStatus: workingStatus,
        workingHours: workingHours,
        startHour: startHour,
        endHour: endHour,
      };
    },
    resetMonthDays: (state) => {
      state.monthDays = [];
    },
  },
});

export const { setMonthDays, updateMonthDay, resetMonthDays } =
  monthDaysSlice.actions;

export default monthDaysSlice.reducer;
