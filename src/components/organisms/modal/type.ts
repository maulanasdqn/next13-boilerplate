import { ReactNode } from "react";

export type TModal = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  children: ReactNode;
};
