import { TUser } from '@types';

export type TTokenPayload = {
  user: TUser;
};

export type TTokens = {
  accessToken: string;
  refreshToken: string;
};
