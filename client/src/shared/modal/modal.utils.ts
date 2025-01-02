import { JSX, useCallback, useContext, useId } from "react";

import { ModalContext } from "./modalContext";

export type TModalProps = {
  onClose(): void;
};

export type TModalComponentProps<K> = Omit<K, keyof TModalProps> &
  Partial<TModalProps>;

/**
 * Creates a custom hook for managing modals.
 *
 * @template T - The type of the props for the modal component.
 * @param {function(T): JSX.Element} mount - A function that returns the modal component.
 *
 * @example
 *
 * import {createModalHook, TModalProps} from '@shared'
 *
 * type TExampleProps = TModalProps & {}
 *
 * const Example = (props: TExampleProps) => {
 * return <div> your Modal content </div>
 * }
 *
 * export const useExampleModal = crateModalHook<TExampleProps>(props => <Example {...props}/>);
 *
 * @example
 *
 * const [handleOpenExampleModal, handleCloseExampleModal] = useExampleModal();
 *
 * @returns {function(): [(props: TModalComponentProps<T>) => void, () => void]} - A hook that returns a function to open the modal and a function to close the modal.
 *
 */
export const createModalHook = <T>(mount: (props: T) => JSX.Element) => {
  return function useModal(): [
    (props: TModalComponentProps<T>) => void,
    () => void
  ] {
    const modalId = useId();
    const context = useContext(ModalContext);

    if (!context) {
      throw new Error("useModal must be used within ModalProvider");
    }

    const { openModal, closeModal } = context;

    const handleClose = useCallback(() => {
      closeModal(modalId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalId]);

    const handleOpen = useCallback(
      (props: TModalComponentProps<T>) => {
        openModal(modalId, () =>
          mount({
            ...props,
            onClose: props.onClose ?? handleClose,
          } as T)
        );
      },
      [modalId, openModal, handleClose]
    );

    return [handleOpen, handleClose];
  };
};
