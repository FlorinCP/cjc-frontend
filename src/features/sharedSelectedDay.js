import { createSlice } from '@reduxjs/toolkit';

export const sharedSelectedDaySlice = createSlice({
    name: 'sharedSelectedDay',
    initialState: {
        value : {}
    },
    reducers: {
        setSelectedDayValue: (state, action) => {
            state.value = action.payload
        },
    },
});

export const { setSelectedDayValue } = sharedSelectedDaySlice.actions;

export default sharedSelectedDaySlice.reducer;
