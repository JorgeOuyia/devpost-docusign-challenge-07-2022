import { configureStore } from "@reduxjs/toolkit";
import arcGISReducer from "./arcGISDuck";
import userReducer from "./userDuck";

const store = configureStore({
  reducer: {
    user: userReducer,
    arcGIS: arcGISReducer,
  },
});

export default store;
