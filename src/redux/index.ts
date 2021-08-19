import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { reducers } from "./rootSlice";

const middleware = [...getDefaultMiddleware({ thunk: false }), logger];

const store = configureStore({
  reducer: reducers,
  middleware,
});

export default store;
