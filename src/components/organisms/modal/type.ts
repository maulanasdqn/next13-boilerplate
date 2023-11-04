import { ReactNode } from "react";

export type TModal = {
  isOpen: boolean;
  title?: string;
  onClose?: () => void;
  children: ReactNode;
  width?: string;
  height?: string;
};
