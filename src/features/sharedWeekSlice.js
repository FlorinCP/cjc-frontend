import { createSlice } from "@reduxjs/toolkit";

export const sharedWeekSlice = createSlice({
  name: "sharedWeek",
  initialState: {
    monday: [],
    tuesday: [],
    wenesday: [],
    thursday: [],
    friday: [],
    saturnday: [],
    sunday: [],
  },
  reducers: {
    setWeekData: (state, action) => {
      state.monday = action.payload.monday;
      state.tuesday = action.payload.tuesday;
      state.wenesday = action.payload.wenesday;
      state.thursday = action.payload.thursday;
      state.friday = action.payload.friday;
      state.saturday = action.payload.saturnday;
      state.sunday = action.payload.sunday;
    },
  },
});



export const { setWeekData } = sharedWeekSlice.actions;

export default sharedWeekSlice.reducer;

