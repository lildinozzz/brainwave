import { MouseEvent, PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import { TModalContentProps } from './Modal.types';
import { usePreventBodyScroll } from 'src/shared/hooks';

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
      className={`fixed h-full top-0 left-0 z-[10000] w-screen bg-black/75 flex flex-col items-center justify-center pointer-events-auto animate-[scale-up_0.2s_ease_out] ${className}`}
      onClick={handleClose}
    >
      <div
        className='w-full max-w-full z-[99999] modal-height-md fixed bottom-0 lg:static lg:max-w-[450px] px-0 animate-[scale-up_0.2s_ease-out]'
        onClick={handleWrapperClick}
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
