import { InputHTMLAttributes } from "react";

export type TOption<T = string | number | undefined> = {
  label: string;
  value: T;
};

export type TField = Omit<
  InputHTMLAttributes<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  "size"
> & {
  variant?: "sm" | "md" | "lg";
  status?: "error" | "warning" | "success" | "none";
  message?: string;
  label?: string;
  options?: Array<TOption>;
};
