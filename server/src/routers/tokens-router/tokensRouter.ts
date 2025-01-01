import { cookiesConfig } from '@config';
import { Router, Request, Response } from 'express';
import { verifyRefreshToken } from '@middlewares';
import { TUser } from '@types';
import { generateTokens } from '@utils';

const tokensRouter = Router();

tokensRouter.get(
  '/refresh',
  verifyRefreshToken,
  async (req: Request, res: Response) => {
    try {
      const user = res.locals.user as TUser;

      const { accessToken, refreshToken } = generateTokens({
        user,
      });

      res
        .cookie('refreshToken', refreshToken, cookiesConfig.refresh)
        .status(200)
        .json({ accessToken, user: res.locals.user });
    } catch (error) {
      res.status(500).json({ message: 'Error while refreshing tokens' });
    }
  }
);

export { tokensRouter };
