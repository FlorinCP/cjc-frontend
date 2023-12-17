// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import sharedWeekReducer from '../features/sharedWeekSlice';
import sharedDisplayedWeekReducer from '../features/sharedDisplayedWeekSlice'
import sharedTodayReducer from "../features/sharedTodaySlice";
import sharedSelectedDayReducer from "../features/sharedSelectedDay";
import tokenReducer from '../features/tokenSlice';
import quesstionReducer from "../features/questionsSlice";
import { jwtDecode } from "jwt-decode";


const myTransform = createTransform(

    (inboundState, key) => {
        return inboundState;
    },

    (outboundState, key) => {
        if (key === 'token' && outboundState.token) {
            const decodedToken = jwtDecode(outboundState.token);
            const currentTime = Date.now() / 1000;

            console.log(decodedToken.exp, currentTime);

            if (decodedToken.exp < currentTime) {
                return {...outboundState, token: null};
            }
        }
        return outboundState;
    },
    {
        whitelist: ['token']
    }
);

const persistConfig = {
    key: 'root',
    storage,
    transforms: [myTransform],
};

const persistedReducers = {
    sharedWeek: persistReducer(persistConfig, sharedWeekReducer),
    sharedDisplayedWeek: persistReducer(persistConfig, sharedDisplayedWeekReducer),
    sharedToday: persistReducer(persistConfig, sharedTodayReducer),
    sharedSelectedDay: persistReducer(persistConfig, sharedSelectedDayReducer),
    token: persistReducer(persistConfig, tokenReducer),
    questions: persistReducer(persistConfig, quesstionReducer),
};

export const store = configureStore({
    reducer: persistedReducers,
});

export const persistor = persistStore(store);
