import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { cookiesConfig } from '@config';
import { generateTokens } from '@utils';
import { v4 as uuidv4 } from 'uuid';

const { User } = require('../../../db/models');

const authRouter: Router = Router();

authRouter.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password, isTrainer } = req.body;

    if (!name || !email || !password) {
      res.status(400).send({ message: 'Please fill in all required fields.' });
      return;
    }

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        name,
        hashpass: await bcrypt.hash(password, 10),
        uuid: uuidv4(),
      },
    });

    if (!created) {
      res.status(409).json({ message: 'User with this email already exists.' });
      return;
    }

    const plainUser = user.get();
    delete plainUser.hashpass;

    const { accessToken, refreshToken } = generateTokens({ user: plainUser });

    res
      .cookie('refreshToken', refreshToken, cookiesConfig.refresh)
      .status(201)
      .json({ accessToken, user: plainUser });
  } catch (error) {
    res.status(500).json({
      message:
        'An error occurred while processing your request. Please try again later.',
    });
  }
});

authRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .json({ message: 'Both email and password are required.' });
      return;
    }

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      res
        .status(404)
        .json({ message: 'User not found. Please check your credentials.' });
      return;
    }

    const valid = await bcrypt.compare(password, user.hashpass);

    if (!valid) {
      res.status(401).json({ message: 'Invalid password. Please try again.' });
      return;
    }

    const plainUser = user.get();
    delete plainUser.hashpass;

    const { accessToken, refreshToken } = generateTokens({ user: plainUser });

    res
      .cookie('refreshToken', refreshToken, cookiesConfig.refresh)
      .status(200)
      .json({ accessToken, user: plainUser });
  } catch (error) {
    res.status(500).json({
      message:
        'An error occurred while processing your request. Please try again later.',
    });
  }
});

authRouter.get('/logout', (req: Request, res: Response) => {
  res
    .clearCookie('refreshToken')
    .status(200)
    .json({ message: 'Logged out successfully.' });
});

export { authRouter };
