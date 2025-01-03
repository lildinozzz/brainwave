import { createAsyncThunk } from '@reduxjs/toolkit';
import { TAuthState, TAuthForm } from 'src/shared/types/auth.types';
import { authService, refreshTokensService } from '../api';

export const authenticateThunk = createAsyncThunk<TAuthState, TAuthForm>(
  'auth/authenticate',
  (formData) => authService.authenticate(formData)
);

export const refreshTokensThunk = createAsyncThunk<TAuthState>(
  'auth/refreshAuth',
  () => refreshTokensService.refresh()
);
