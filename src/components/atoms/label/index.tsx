import { FC, HTMLAttributes, ReactElement } from "react";

export const Label: FC<HTMLAttributes<HTMLLabelElement>> = (props): ReactElement => {
  return <label {...props}>{props.children}</label>;
};
