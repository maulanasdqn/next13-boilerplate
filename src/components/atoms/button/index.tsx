import clsx from "clsx";
import { FC, ReactElement } from "react";
import { TButton } from "./type";

export const Button: FC<TButton> = (props): ReactElement => {
  const size = clsx({
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-base",
  });

  const variant = clsx({
    primary: "bg-blue-500 text-white",
    secondary: "bg-white text-blue-500",
  });

  const { className = `${size} ${variant}` } = props;

  return (
    <button className={className} {...props}>
      {props.children}
    </button>
  );
};
