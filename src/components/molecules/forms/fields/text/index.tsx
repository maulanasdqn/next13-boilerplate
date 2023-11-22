import { InputText, Fieldset } from "@/components";
import { ReactElement, forwardRef } from "react";
import { TFieldText } from "./type";

export const FieldText = forwardRef<HTMLInputElement, TFieldText>(
  ({ size, ...props }, ref): ReactElement => {
    return (
      <Fieldset size={size} {...props}>
        <InputText {...props} ref={ref} size={size} />
      </Fieldset>
    );
  },
);

FieldText.displayName = "FieldText";
