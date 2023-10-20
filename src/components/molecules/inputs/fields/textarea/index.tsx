import { FC, ReactElement, Ref, forwardRef } from "react";
import { InputWrapper, TField } from "@/components";

export const TextAreaField: FC<TField> = forwardRef(
  (props, ref: Ref<HTMLTextAreaElement>): ReactElement => {
    return (
      <InputWrapper {...props}>
        <textarea ref={ref} {...props} />
      </InputWrapper>
    );
  },
);
