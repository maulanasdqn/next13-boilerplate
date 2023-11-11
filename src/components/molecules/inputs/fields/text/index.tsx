import { ReactElement, forwardRef } from "react";
import { InputWrapper, TField, className } from "@/components";

export const TextField = forwardRef<HTMLInputElement, TField<HTMLInputElement>>(
  (props, ref): ReactElement => {
    return (
      <InputWrapper {...props}>
        <input {...props} className={className(props)} data-testid="text-field" ref={ref} />
      </InputWrapper>
    );
  },
);

TextField.displayName = "TextField";
