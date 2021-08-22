import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { reducers } from "./rootSlice";

const middleware = [...getDefaultMiddleware({ thunk: false }), logger];

const store = configureStore({
  reducer: reducers,
  middleware,
});

export type store = typeof store;
export type dispatch = typeof store.dispatch;
export default store;
