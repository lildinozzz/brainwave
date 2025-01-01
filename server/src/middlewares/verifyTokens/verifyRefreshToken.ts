import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { TUser } from '@types';

dotenv.config();

export function verifyRefreshToken(req: Request, res: Response, next: NextFunction): void {
  try {
    const { refreshToken } = req.cookies;
    const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as {
      user: TUser;
    };

    res.locals.user = user;

    next();
  } catch (error) {
    res.clearCookie('refreshToken').sendStatus(403);
  }
}
