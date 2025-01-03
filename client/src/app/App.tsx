import { useEffect } from 'react';
import { refreshAuth } from './store/reducers/user-info/reducers';
import { useAppDispatch } from '@hooks';

type TAppProps = {
  children?: React.ReactNode;
};

export const App = ({ children }: TAppProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshAuth());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};
