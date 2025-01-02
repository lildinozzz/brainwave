import { createSlice } from '@reduxjs/toolkit';
import { logout, refreshAuth, authenticate } from './reducers';
import { TAuthState } from 'src/services/auth/types';

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
    builder.addCase(refreshAuth.fulfilled, (state, action) => action.payload);
    builder.addCase(refreshAuth.rejected, (state) => {
      state.user.status = 'guest';
    });
    builder.addCase(authenticate.fulfilled, (state, action) => action.payload);
    builder.addCase(logout.fulfilled, (state) => {
      state.user.status = 'guest';
      state.accessToken = '';
      state.isAuthed = false;
    });
  },
});
