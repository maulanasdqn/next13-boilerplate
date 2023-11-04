import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react";

export type TOption<T = string | number> = {
  label: string;
  value: T;
};

export type TField = Omit<
  DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >,
  "size"
> & {
  variant?: "sm" | "md" | "lg";
  status?: "error" | "warning" | "success" | "none";
  message?: string;
  label?: string;
  append?: ReactNode;
  preppend?: ReactNode;
};
