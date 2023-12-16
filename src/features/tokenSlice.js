// tokenSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        token: false,
        email: null,
        role: null
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload.token;
            state.email = action.payload.email;
            state.role = action.payload.role;
        },
        clearToken: (state) => {
            state.token = false;
            state.email = null;
            state.role = null;
        }
    }
});

export const { setToken, clearToken } = tokenSlice.actions;

export default tokenSlice.reducer;
