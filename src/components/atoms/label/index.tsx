import { FC, ReactElement } from "react";
import { TLabel } from "./type";

export const Label: FC<TLabel> = (props): ReactElement => {
  const { className = "flex gap-x-1" } = props;
  return (
    <label className={className} {...props}>
      {props.children}
      {props.required && <span className="text-red">*</span>}
    </label>
  );
};
