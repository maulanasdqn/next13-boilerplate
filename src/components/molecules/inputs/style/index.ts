import { clsx } from "clsx";
import { ReactNode } from "react";

export const className = ({
  variant,
  status,
  preppend,
  append,
}: {
  variant?: "sm" | "md" | "lg";
  status?: "error" | "warning" | "success" | "none";
  preppend?: ReactNode;
  append?: ReactNode;
}) =>
  clsx(
    "rounded-lg border border-1 outline-none w-full",
    "disabled:bg-gray-100 disabled:placeholder:text-gray-300 disabled:border-gray-200",
    "disable:cursor-not-allowed disable:opacity-50 disable:select-none ",
    {
      "text-sm placeholder:text-xs pl-2 pr-3 py-2": variant === "sm" && !preppend && !append,
      "text-sm placeholder:text-xs pl-8 pr-3 py-2": variant === "sm" && preppend && !append,
      "text-sm placeholder:text-xs pl-2 pr-8 py-2": variant === "sm" && !preppend && append,
      "text-sm placeholder:text-xs pl-8 pr-8 py-2": variant === "sm" && preppend && append,
    },
    {
      "text-base placeholder:text-sm pl-3 pr-4 py-3": variant === "md" && !preppend && !append,
      "text-base placeholder:text-sm pl-10 pr-4 py-3": variant === "md" && preppend && !append,
      "text-base placeholder:text-sm pl-3 pr-10 py-3": variant === "md" && !preppend && append,
      "text-base placeholder:text-sm pl-10 pr-10 py-3": variant === "md" && preppend && append,
    },
    {
      "text-lg placeholder:text-base pl-4 pr-5 py-4": variant === "lg" && !preppend && !append,
    },
    {
      "border-gray-300 placeholder:text-gray-400 bg-gray-50": status === "none",
      "border-green-300 placeholder:text-green-300 bg-green-50": status === "success",
      "border-red-300 placeholder:text-red-300 bg-red-50": status === "error",
      "border-yellow-400 placeholder:text-yellow-400 bg-yellow-50": status === "warning",
    },
  );
