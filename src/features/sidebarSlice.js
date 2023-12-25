import {createSlice} from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        isExpanded: true,
    },
    reducers: {
        setSidebarValue: (state, action) => {
            state.isExpanded = action.payload
        },
    },
});

export const {setSidebarValue} = sidebarSlice.actions;

export default sidebarSlice.reducer;
