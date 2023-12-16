// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import sharedWeekReducer from '../features/sharedWeekSlice';
import sharedDisplayedWeekReducer from '../features/sharedDisplayedWeekSlice'
import sharedTodayReducer from "../features/sharedTodaySlice";
import sharedSelectedDayReducer from "../features/sharedSelectedDay";
import tokenReducer from '../features/tokenSlice';


const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducers = {
    sharedWeek: persistReducer(persistConfig, sharedWeekReducer),
    sharedDisplayedWeek: persistReducer(persistConfig, sharedDisplayedWeekReducer),
    sharedToday: persistReducer(persistConfig, sharedTodayReducer),
    sharedSelectedDay: persistReducer(persistConfig, sharedSelectedDayReducer),
    token: persistReducer(persistConfig, tokenReducer),
};

export const store = configureStore({
    reducer: persistedReducers,
});

export const persistor = persistStore(store);
