import { useState } from 'react';
import { brainwave } from '../../assets';
import { navigation } from '../../constants';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { MenuSvg } from '../../assets/svg';
import { HamburgerMenu } from '../design/Header';
import { Button } from '@components';
import { pathsConfig } from '@config';
import { scrollToNavElement } from '@shared';
import { usePreventBodyScroll } from '@hooks';

export const Header = () => {
  const location = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  usePreventBodyScroll(openNavigation);

  const toggleNavigation = () => {
    setOpenNavigation(!openNavigation);
  };

  const handleNavigationClick = (key: string) => {
    scrollToNavElement(key);
    setOpenNavigation(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? 'bg-n-8' : 'bg-n-8/90 backdrop-blur-sm'
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
            openNavigation ? 'flex' : 'hidden'
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          {location.pathname === pathsConfig.home.link && (
            <div className='relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row'>
              {navigation.map((item) => (
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
                  } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
                >
                  {item.title}
                </RouterLink>
              ))}
            </div>
          )}

          <HamburgerMenu />
        </nav>

        <RouterLink
          to='#signup'
          className='button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block'
        >
          New account
        </RouterLink>
        <RouterLink
          to='#signIn'
          className='button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block'
        >
          Sign In
        </RouterLink>

        <Button
          className='ml-auto lg:hidden'
          px='px-3'
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};
