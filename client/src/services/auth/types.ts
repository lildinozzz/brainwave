export type TAuthStatus = 'unknown' | 'guest' | 'logged';

export type TUserFromBackend = {
  id: number;
  email: string;
  uuid: string;
};

export type TUserStatusType =
  | { status: 'unknown' }
  | { status: 'guest' }
  | ({
      status: 'logged';
    } & TUserFromBackend);

export type TAuthState = {
  accessToken: string;
  user: TUserStatusType;
  isAuthed: boolean;
  successInvoiceCount: number;
};

export type TAuthForm = {
  email: string;
  password: string;
};

export type TBackendAuthInfo = { accessToken: string; user: TUserFromBackend };
