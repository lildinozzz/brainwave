import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from 'src/services/auth/authService';
import { TAuthState, TAuthForm } from 'src/services/auth/types';

export const loginThunk = createAsyncThunk<TAuthState, TAuthForm>(
  'auth/login',
  (formData) => authService.login(formData)
);

export const registerThunk = createAsyncThunk<TAuthState, TAuthForm>(
  'auth/register',
  (formData) => authService.register(formData)
);

export const refreshAuth = createAsyncThunk<TAuthState>(
  'auth/refreshAuth',
  () => authService.refresh()
);

export const logout = createAsyncThunk('/auth/logout', async () => {
  await authService.logout();
});
