import { ReactElement, Ref, forwardRef } from "react";
import { InputWrapper, TField } from "@/components";

export const CheckBoxField = forwardRef<HTMLInputElement, TField>(
  (props, ref: Ref<HTMLInputElement>): ReactElement => {
    return (
      <InputWrapper {...props} type="checkbox">
        <input id={props.name} data-testid="checkbox-field" {...props} type="checkbox" ref={ref} />
      </InputWrapper>
    );
  },
);

CheckBoxField.displayName = "CheckBoxField";
