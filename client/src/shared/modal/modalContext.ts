import { createContext, FC } from "react";

export type TModal = {
  id: string;
  Component: FC;
};

type TModalContext = {
  modals: TModal[];
  openModal(id: string, Component: FC): void;
  closeModal(id: string): void;
};

const defaultValue: TModalContext = {
  modals: [],
  openModal() {},
  closeModal() {},
};

export const ModalContext = createContext(defaultValue);
