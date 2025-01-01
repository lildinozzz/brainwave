import { CookieOptions } from 'express';
import { jwtConfig } from './jwtConfig';

export const cookiesConfig = {
  refresh: {
    httpOnly: true,
    maxAge: jwtConfig.refresh.expiresIn,
    sameSite: 'none' as const,
    secure: true,
  } as CookieOptions,
  access: {
    httpOnly: true,
    maxAge: jwtConfig.access.expiresIn,
  } as CookieOptions,
};
