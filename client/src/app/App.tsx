import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refreshTokensThunk } from 'src/features/auth-user/model/reducer';
import { useAppDispatch } from 'src/shared/hooks/useAppDispatch';

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
