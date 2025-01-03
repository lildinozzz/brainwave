import { useEffect } from 'react';

export const usePreventBodyScroll = <T,>(value: T) => {
  useEffect(() => {
    if (value) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [value]);
};
