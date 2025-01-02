import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from 'src/services/auth/authService';
import { TAuthState, TAuthForm } from 'src/services/auth/types';

export const authenticate = createAsyncThunk<TAuthState, TAuthForm>(
  'auth/authenticate',
  (formData) => authService.authenticate(formData)
);

export const refreshAuth = createAsyncThunk<TAuthState>(
  'auth/refreshAuth',
  () => authService.refresh()
);

export const logout = createAsyncThunk('/auth/logout', async () => {
  await authService.logout();
});
