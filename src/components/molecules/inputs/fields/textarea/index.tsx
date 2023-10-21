import { FC, ReactElement, forwardRef } from "react";
import { InputWrapper, TField, className } from "@/components";

export const TextAreaField: FC = forwardRef<HTMLTextAreaElement, TField>(
  (props, ref): ReactElement => {
    return (
      <InputWrapper {...props}>
        <textarea {...props} className={className(props)} data-testid="textarea-field" ref={ref} />
      </InputWrapper>
    );
  },
);

TextAreaField.displayName = "TextAreaField";
