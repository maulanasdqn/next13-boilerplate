import { InputHTMLAttributes } from "react";

export type TCheckboxField = InputHTMLAttributes<HTMLInputElement> & {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  label?: string;
};
