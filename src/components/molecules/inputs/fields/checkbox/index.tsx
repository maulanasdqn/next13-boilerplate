import { FC, ReactElement, Ref, forwardRef } from "react";
import { InputWrapper, TField } from "@/components";

export const CheckBoxField: FC = forwardRef<HTMLInputElement, TField>(
  (props, ref: Ref<HTMLInputElement>): ReactElement => {
    return (
      <InputWrapper {...props} type="checkbox">
        <input {...props} type="checkbox" ref={ref} />
      </InputWrapper>
    );
  },
);

CheckBoxField.displayName = "CheckBoxField";
