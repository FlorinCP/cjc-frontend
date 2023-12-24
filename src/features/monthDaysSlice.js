import { createSlice } from "@reduxjs/toolkit";

export const monthDaysSlice = createSlice({
  name: "monthDays",
  initialState: {
    monthDays: [],
  },
  reducers: {
    setMonthDays: (state, action) => {
      state.monthDays = action.payload;
      console.log(state.monthDays);
    },
    updateMonthDay: (state, action) => {
      state.monthDays =action.payload
    },
    resetMonthDays: (state) => {
      state.monthDays = [];
    },
  },
});

export const { setMonthDays, updateMonthDay, resetMonthDays } =
  monthDaysSlice.actions;

export default monthDaysSlice.reducer;
