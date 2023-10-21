import { FC, ReactElement } from "react";
import { TLabel } from "./type";
import { clsx } from "clsx";

export const Label: FC<TLabel> = (props): ReactElement => {
  const className = clsx(
    "flex gap-x-1 ",
    {
      "text-sm": props.size === "sm",
      "text-base": props.size === "md",
      "text-lg": props.size === "lg",
    },
    {
      "text-gray-400": props.disabled,
    },
  );

  return (
    <label data-testid="label" className={className} {...props}>
      {props.children}
      {props.required && (
        <span data-testid="required" className="text-red-700">
          *
        </span>
      )}
    </label>
  );
};
