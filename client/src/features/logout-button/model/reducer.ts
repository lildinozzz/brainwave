import { createAsyncThunk } from '@reduxjs/toolkit';
import { logoutService } from '../api/LogoutService';

export const logoutThunk = createAsyncThunk('/auth/logout', async () => {
  await logoutService.logout();
});
