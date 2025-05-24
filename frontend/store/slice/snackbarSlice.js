const { createSlice } = require("@reduxjs/toolkit");

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: {
    open: false,
    color: "success",
    message: "",
  },
  reducers: {
    openSuccessSnackbar: (state, action) => {
      state.open = true;
      state.color = "success";
      state.message = action.payload;
    },

    openErrorSnackbar: (state, action) => {
      state.open = true;
      state.color = "error";
      state.message = action.payload || "Something went wrong";
    },
    closeSnackbar: (state, action) => {
      state.open = false;
    },
  },
});

export const { openSuccessSnackbar, openErrorSnackbar, closeSnackbar } =
  snackbarSlice.actions;

export default snackbarSlice.reducer;
