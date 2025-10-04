import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: {
    id: string;
    email: string;
    name: string;
    avatar_url: string;
  };
  isLoggedIn: boolean;
}

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      id: "",
      email: "",
      name: "",
      avatar_url: "",
    },
    isLoggedIn: false,
  } as AuthState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = {
        id: "",
        email: "",
        name: "",
        avatar_url: "",
      };
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
