import { useEffect } from 'react';

export const usePreventBodyScroll = <T,>(value: T) => {
  const query = `(max-width: 767px)`;

  const isMobile = window.matchMedia(query).matches;

  useEffect(() => {
    if (value && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [value, isMobile]);
};
