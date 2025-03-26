import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, applyMiddleware } from "redux";
import {
  Login,
  Sign_up,
  Profile,
  BookingItems,
  Customers,
  Analytics,
} from "./reducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { logger } from "redux-logger";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  login: Login,
  signup: Sign_up,
  profile: Profile,
  items: BookingItems,
  customer: Customers,
  analytics: Analytics,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Disable serializable check for redux-persist non-serializable data
      serializableCheck: false,
    }).concat(logger),
});

export const persistor = persistStore(store);
