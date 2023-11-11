import { ReactElement, forwardRef } from "react";
import { InputWrapper, className } from "@/components";
import { TTextAreaField } from "./type";

export const TextAreaField = forwardRef<HTMLTextAreaElement, TTextAreaField>(
  (props, ref): ReactElement => {
    return (
      <InputWrapper {...props}>
        <textarea {...props} className={className(props)} data-testid="textarea-field" ref={ref} />
      </InputWrapper>
    );
  },
);

TextAreaField.displayName = "TextAreaField";
