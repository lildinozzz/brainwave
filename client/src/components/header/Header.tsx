import { useEffect, useState } from 'react';
import { brainwave } from '../../assets';
import { navigation } from '../../constants';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { MenuSvg } from '../../assets/svg';
import { HamburgerMenu } from '../design/Header';
import { Button } from '@components';
import { pathsConfig } from '@config';
import { scrollToNavElement } from '@utils';
import { usePreventBodyScroll } from '@hooks';
import { useAuthModal } from 'src/features/auth/AuthModal';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { userInfoSelectors } from 'src/store/reducers/user-info/selectors';
import { logout } from 'src/store/reducers/user-info/reducers';

export const Header = () => {
  const dispatch = useAppDispatch();
  const { isAuthed } = useAppSelector(userInfoSelectors.userInfo);
  const [isOpenedNavigation, setIsOpenedNavigation] = useState(false);
  const location = useLocation();
  const [AuthModal] = useAuthModal();

  usePreventBodyScroll(isOpenedNavigation);

  useEffect(() => {
    if (
      [pathsConfig.signUp.key, pathsConfig.signIn.key].includes(location.hash)
    ) {
      AuthModal({});
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.hash]);

  const toggleNavigation = () =>
    setIsOpenedNavigation((prevState) => !prevState);

  const handleNavigationClick = (key: string) => {
    if (key === pathsConfig.logout.key) {
      dispatch(logout());
      setIsOpenedNavigation(false);
      return;
    }

    scrollToNavElement(key);
    setIsOpenedNavigation(false);
  };

  const handleLogout = () => dispatch(logout());

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        isOpenedNavigation ? 'bg-n-8' : 'bg-n-8/90 backdrop-blur-sm'
      }`}
    >
      <div className='flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4 h-[84px]'>
        <RouterLink
          className='block w-[12rem] xl:mr-8'
          to={pathsConfig.home.link}
        >
          <img src={brainwave} width={190} height={40} alt='Brainwave' />
        </RouterLink>

        <nav
          className={`${
            isOpenedNavigation ? 'flex' : 'hidden'
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className='relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row'>
            {navigation.map((item) => {
              const shouldHideLogoutItem =
                !isAuthed && item.url === pathsConfig.logout.key;

              const shouldHideAuthItems =
                isAuthed &&
                (item.url === pathsConfig.signIn.key ||
                  item.url === pathsConfig.signUp.key);

              if (shouldHideLogoutItem || shouldHideAuthItems) {
                return null;
              }

              return (
                <RouterLink
                  key={item.id}
                  to={item.url}
                  onClick={() => handleNavigationClick(item.url)}
                  className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                    item.onlyMobile ? 'lg:hidden' : ''
                  } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                    item.url === location.hash
                      ? 'z-2 lg:text-n-1'
                      : 'lg:text-n-1/50'
                  } ${
                    location.pathname === pathsConfig.payment.link
                      ? 'md:hidden'
                      : ''
                  }  lg:leading-5 lg:hover:text-n-1 xl:px-12`}
                >
                  {item.title}
                </RouterLink>
              );
            })}
          </div>

          <HamburgerMenu />
        </nav>

        {!isAuthed && (
          <>
            <RouterLink
              to={pathsConfig.signUp.key}
              className={`button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block ${
                pathsConfig.signUp.key === location.hash
                  ? 'z-2 lg:text-n-1'
                  : 'lg:text-n-1/50'
              }`}
            >
              New account
            </RouterLink>
            <RouterLink
              to={pathsConfig.signIn.key}
              className={`button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block ${
                pathsConfig.signIn.link === location.hash
                  ? 'z-2 lg:text-n-1'
                  : 'lg:text-n-1/50'
              }`}
            >
              Sign In
            </RouterLink>
          </>
        )}

        {isAuthed && (
          <Button
            className='hidden lg:block text-n-1/50'
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}

        <Button
          className='ml-auto lg:hidden'
          px='px-3'
          onClick={toggleNavigation}
        >
          <MenuSvg isOpenedNavigation={isOpenedNavigation} />
        </Button>
      </div>
    </div>
  );
};
