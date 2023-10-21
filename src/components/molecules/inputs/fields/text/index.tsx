import { FC, ReactElement, Ref, forwardRef } from "react";
import { InputWrapper, TField, className } from "@/components";

export const TextField: FC<TField> = forwardRef(
  (props, ref: Ref<HTMLInputElement>): ReactElement => {
    return (
      <InputWrapper {...props}>
        <input className={className(props)} data-testid="text-field" ref={ref} {...props} />
      </InputWrapper>
    );
  },
);

TextField.displayName = "TextField";
