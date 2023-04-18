import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import tablesReducer from "../slices/tablesSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      user: userReducer,
      tables: tablesReducer
    },
  });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
