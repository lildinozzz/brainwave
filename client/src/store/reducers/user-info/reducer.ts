import { createSlice } from '@reduxjs/toolkit';
import { logout, refreshAuth, authenticate } from './reducers';
import { TAuthState } from 'src/services/auth/types';
import { toast } from 'react-toastify';

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
    builder.addCase(refreshAuth.fulfilled, (_, action) => action.payload);
    builder.addCase(refreshAuth.rejected, (state) => {
      state.user.status = 'guest';
    });
    builder.addCase(authenticate.fulfilled, (_, action) => {
      toast.success('You are now logged in');
      return action.payload;
    });
    builder.addCase(authenticate.rejected, () => {
      toast.error(`Failed to log in, please try again.`);
    });
    builder.addCase(logout.fulfilled, (state) => {
      toast.success('You are now logged out.');
      state.user.status = 'guest';
      state.accessToken = '';
      state.isAuthed = false;
    });
  },
});
