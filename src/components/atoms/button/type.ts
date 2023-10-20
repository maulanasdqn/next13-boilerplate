import { ButtonHTMLAttributes } from "react";

export type TButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
};
