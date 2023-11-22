import { inputClassName } from "@/utils";
import { forwardRef } from "react";
import { TInputText } from "./type";

export const InputText = forwardRef<HTMLInputElement, TInputText>(
  ({ size = "sm", ...props }, ref) => {
    return (
      <input
        className={inputClassName({ size, ...props })}
        id={props.name}
        data-testid="input-text"
        ref={ref}
        {...props}
      />
    );
  },
);

InputText.displayName = "InputText";
