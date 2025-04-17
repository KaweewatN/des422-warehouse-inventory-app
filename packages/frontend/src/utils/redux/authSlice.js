import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  uname: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.uname = action.payload.uname;
      state.role = action.payload.role;
    },
    clearUser: (state) => {
      state.uname = null;
      state.role = null;
    },
  },
});

export const {setUser, clearUser} = authSlice.actions;
export default authSlice.reducer;
