import { LabelHTMLAttributes } from "react";

export type TLabel = LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
};
