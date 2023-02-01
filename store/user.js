import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  // Redux Toolkit allows us to write "mutating" logic in reducers.
  reducers: {
    isLoggedIn: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { isLoggedIn } = userSlice.actions;

export default userSlice.reducer;
