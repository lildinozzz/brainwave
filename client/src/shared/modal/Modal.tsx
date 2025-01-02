import { MouseEvent, PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import { TModalContentProps } from './Modal.types';
import { usePreventBodyScroll } from '@hooks';

const Root = ({ children }: PropsWithChildren) => {
  usePreventBodyScroll(true);

  const modalRoot = document.getElementById('modal-portal');

  if (!modalRoot) {
    return null;
  }

  return ReactDOM.createPortal(children, modalRoot);
};

const Content = ({ children, onClose, className = '' }: TModalContentProps) => {
  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    onClose();
  };
  const handleWrapperClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`fixed top-0 left-0 z-[100000] w-screen max-h-screen min-h-[100%] bg-black/75 flex flex-col items-center justify-center pointer-events-auto animate-[scale-up_0.2s_ease-out] ${className}`}
      onClick={handleClose}
    >
      <div
        onClick={handleWrapperClick}
        className='w-full max-w-[450px] z-[99999] py-[80px] px-0 animate-[scale-up_0.2s_ease-out] sm:max-w-full sm:max-h-[90vh]'
      >
        {children}
      </div>
    </div>
  );
};

export const Modal = {
  Root,
  Content,
};
