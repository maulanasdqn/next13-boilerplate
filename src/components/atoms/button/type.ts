import { ButtonHTMLAttributes } from "react";

export type TButton = {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
} & ButtonHTMLAttributes<HTMLButtonElement>;
