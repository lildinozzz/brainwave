import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { logoutThunk } from 'src/features/logout-button/model/reducer';
import { authenticateThunk, refreshTokensThunk } from 'src/features/auth-user/model/reducer';
import { TAuthState } from 'src/shared/types/auth.types';

const initialState: TAuthState = {
  accessToken: '',
  user: {
    status: 'unknown',
  },
  isAuthed: false,
};

export const { actions, reducer } = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(refreshTokensThunk.fulfilled, (_, action) => action.payload);
    builder.addCase(refreshTokensThunk.rejected, (state) => {
      state.user.status = 'guest';
    });
    builder.addCase(authenticateThunk.fulfilled, (_, action) => {
      toast.success('You are now logged in');
      return action.payload;
    });
    builder.addCase(authenticateThunk.rejected, () => {
      toast.error(`Failed to log in, please try again.`);
    });
    builder.addCase(logoutThunk.fulfilled, (state) => {
      toast.success('You are now logged out.');
      state.user.status = 'guest';
      state.accessToken = '';
      state.isAuthed = false;
    });
  },
});
