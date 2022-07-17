import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userDuck'

const store = configureStore({
    reducer: {
        user: userReducer
    }
});

export default store;