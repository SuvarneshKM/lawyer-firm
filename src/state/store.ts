import { configureStore } from "@reduxjs/toolkit";
import lawyerReducer from "./lawyer/lawyerSlice";

export const store = configureStore({
  reducer: {
    lawyer: lawyerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
