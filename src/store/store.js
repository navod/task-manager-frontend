import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./slices/task";
import authSlice from "./slices/auth";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    task: taskSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
