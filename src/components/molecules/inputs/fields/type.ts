import { InputHTMLAttributes } from "react";

export type TField = InputHTMLAttributes<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
> & {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  label?: string;
};
