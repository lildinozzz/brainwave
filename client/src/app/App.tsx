import { useAppDispatch } from '@shared';
import { useEffect } from 'react';
import { refreshTokensThunk } from 'src/features/auth-user/model/reducer';

type TAppProps = {
  children?: React.ReactNode;
};

export const App = ({ children }: TAppProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshTokensThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};
