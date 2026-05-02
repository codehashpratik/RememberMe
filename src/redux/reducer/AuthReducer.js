import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: '',
  isLoading: true,
  registrationUsers: {},
  loginResponse: {},
  error: {},
  isToken: null,
};

const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setToken(state, action) {
      state.isToken = action.payload;
      state.type = action.type;
    },
    getTokenRequest(state, action) {
      state.type = action.type;
    },
    getTokenSuccess(state, action) {
      state.isToken = action.payload;
      state.isLoading = false;
      state.type = action.type;
    },
    getTokenFaliure(state, action) {
      state.isToken = null;
      state.isLoading = false;
      state.type = action.type;
    },
    signInSuccess(state, action) {
      state.isToken = action.payload;
      state.type = action.type;
    },

    // ✅ ADD THIS
    signOut(state) {
      state.isToken = null;
      state.type = 'SIGN_OUT';
    },
  },
});

export const {
  setToken,
  getTokenRequest,
  getTokenSuccess,
  getTokenFaliure,
  signInSuccess,
  signOut, // ✅ ADD THIS
} = AuthSlice.actions;

export default AuthSlice.reducer;
