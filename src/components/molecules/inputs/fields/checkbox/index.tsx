import { ReactElement, forwardRef } from "react";
import { InputWrapper } from "@/components";
import { TCheckboxField } from "./type";

export const CheckBoxField = forwardRef<HTMLInputElement, TCheckboxField>(
  (props, ref): ReactElement => {
    return (
      <InputWrapper {...props} type="checkbox">
        <input id={props.name} data-testid="checkbox-field" {...props} type="checkbox" ref={ref} />
      </InputWrapper>
    );
  },
);

CheckBoxField.displayName = "CheckBoxField";
