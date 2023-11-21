import { inputClassName } from "@/utils";
import { forwardRef } from "react";
import { TInputText } from "./type";

export const InputText = forwardRef<HTMLInputElement, TInputText>((props, ref) => {
  return <input className={inputClassName(props)} ref={ref} />;
});

InputText.displayName = "InputText";
