import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from "./slice/snackbarSlice";

export const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
  },
});
