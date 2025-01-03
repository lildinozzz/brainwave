import { Button } from '@components';
import { userInfoSelectors } from 'src/app/store/reducers/user-info/selectors';
import { logoutThunk } from '../model/reducer';
import { useAppDispatch } from 'src/shared/hooks/useAppDispatch';
import { useAppSelector } from 'src/shared/hooks/useAppSelector';

export const LogoutButton = () => {
  const { isAuthed } = useAppSelector(userInfoSelectors.userInfo);
  const dispatch = useAppDispatch();

  const handleLogout = () => dispatch(logoutThunk());

  return (
    isAuthed && (
      <Button className='hidden lg:block text-n-1/50' onClick={handleLogout}>
        Logout
      </Button>
    )
  );
};
