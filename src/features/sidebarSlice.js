import {createSlice} from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        isExpanded: true,
    },
    reducers: {
        setSidebarStatus: (state, action) => {
            state.isExpanded = action.payload
        },
    },
});

export const {setSidebarStatus} = sidebarSlice.actions;

export default sidebarSlice.reducer;
