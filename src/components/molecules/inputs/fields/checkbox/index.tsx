import { FC, ReactElement, Ref, forwardRef } from "react";
import { InputWrapper, TField } from "@/components";

export const CheckBoxField: FC<TField> = forwardRef(
  (props, ref: Ref<HTMLInputElement>): ReactElement => {
    return (
      <InputWrapper {...props}>
        <input type="checkbox" ref={ref} {...props} />
      </InputWrapper>
    );
  },
);
