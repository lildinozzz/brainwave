import { PropsWithChildren } from "react";

export type TModalContentProps = PropsWithChildren & {
  onClose(): void;
  className?: string;
};
