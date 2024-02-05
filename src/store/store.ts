import { configureStore } from "@reduxjs/toolkit/react";
import counterReducer from "./slice/counterSlice";
import messageReducer from "./slice/messageSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    message: messageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
