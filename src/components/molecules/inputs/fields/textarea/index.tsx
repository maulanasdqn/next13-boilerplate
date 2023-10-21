import { FC, ReactElement, Ref, forwardRef } from "react";
import { InputWrapper, TField, className } from "@/components";

export const TextAreaField: FC<TField> = forwardRef(
  (props, ref: Ref<HTMLTextAreaElement>): ReactElement => {
    return (
      <InputWrapper {...props}>
        <textarea className={className(props)} data-testid="textarea-field" ref={ref} {...props} />
      </InputWrapper>
    );
  },
);

TextAreaField.displayName = "TextAreaField";
