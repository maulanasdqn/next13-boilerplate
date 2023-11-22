import { inputClassName } from "@/utils";
import { forwardRef } from "react";
import { TInputText } from "./type";

export const InputText = forwardRef<HTMLInputElement, TInputText>(({ size, ...props }, ref) => {
  return (
    <input
      {...props}
      id={props.name}
      data-testid="input-text"
      className={inputClassName({ size, ...props })}
      ref={ref}
    />
  );
});

InputText.displayName = "InputText";
