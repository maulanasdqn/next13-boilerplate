import { PropsWithChildren } from "react";

export type TInputWrapper = PropsWithChildren & {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  label?: string;
  required?: boolean;
  message?: string;
};
