import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  AvatarUpdated: false,
};

const ProfileSlice = createSlice({
  name: 'Profile',
  initialState,
  reducers: {
    UpdateProfileAvatar(state, action) {
      state.AvatarUpdated = action.payload;
      state.type = action.type;
    },
  },
});

export const { UpdateProfileAvatar } = ProfileSlice.actions;
export const SelectAvatar = state => state.ProfileReducer.AvatarUpdated;

export default ProfileSlice.reducer;
