import {
  FC,
  memo,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";

import { ModalContext, TModal } from "./modalContext";

export const ModalProvider = memo((props: PropsWithChildren) => {
  const { children } = props;
  const [modals, setModal] = useState<TModal[]>([]);

  const openModal = useCallback(
    (id: string, Component: FC) => {
      if (modals.some((modal) => modal.id === id)) {
        return;
      }

      setModal((prevState) => [...prevState, { id, Component }]);
    },
    [modals]
  );

  const closeModal = useCallback((id: string) => {
    setModal((prevState) =>
      prevState.filter(({ id: dialogId }) => dialogId !== id)
    );
  }, []);

  const value = useMemo(() => {
    return {
      modals,
      openModal,
      closeModal,
    };
  }, [modals, openModal, closeModal]);

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modals.map(({ Component, id }) => (
        <Component key={id} />
      ))}
    </ModalContext.Provider>
  );
});

ModalProvider.displayName = "ModalProvider";
