import { FC, ReactElement, Ref, forwardRef } from "react";
import { InputWrapper, TField } from "@/components";

export const TextField: FC<TField> = forwardRef(
  (props, ref: Ref<HTMLInputElement>): ReactElement => {
    return (
      <InputWrapper {...props}>
        <input ref={ref} {...props} />
      </InputWrapper>
    );
  },
);
