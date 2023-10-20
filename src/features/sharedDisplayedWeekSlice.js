import { createSlice } from '@reduxjs/toolkit';

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
