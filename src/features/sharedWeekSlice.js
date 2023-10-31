import { createSlice } from "@reduxjs/toolkit";

export const sharedWeekSlice = createSlice({
  name: "sharedWeek",
  initialState: {
    monday: [],
    tuesday: [],
    wenesday: [],
    thursday: [],
    friday: [],
    saturday: [],
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
    setDayData: (state, action) => {
      const { dayName, data } = action.payload;
      console.log(action.payload)
      if (state.hasOwnProperty(dayName)) { // This checks if the provided day exists in the state
        state[dayName] = data;
      }
    },
  },
});



export const { setWeekData ,setDayData} = sharedWeekSlice.actions;

export default sharedWeekSlice.reducer;

