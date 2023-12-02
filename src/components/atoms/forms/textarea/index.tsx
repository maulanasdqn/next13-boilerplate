import { TTextArea } from "@/entities";
import { inputClassName } from "@/utils";
import { forwardRef } from "react";
import { TTextAreaProps } from "./type";

export const TextArea = forwardRef<HTMLTextAreaElement, TTextAreaProps>((props, ref) => {
  return <textarea className={inputClassName(props)} ref={ref} />;
});

TextArea.displayName = "InputTextArea";
