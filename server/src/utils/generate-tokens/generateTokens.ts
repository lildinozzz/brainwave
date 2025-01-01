import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { jwtConfig } from '@config';
import { TTokenPayload, TTokens } from './tokens.types';

dotenv.config();

export function generateTokens(payload: TTokenPayload): TTokens {
  return {
    accessToken: jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
      expiresIn: jwtConfig.access.expiresIn,
    }),
    refreshToken: jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {
      expiresIn: jwtConfig.refresh.expiresIn,
    }),
  };
}
