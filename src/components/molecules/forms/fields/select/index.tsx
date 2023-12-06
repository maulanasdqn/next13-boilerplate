import { Select, Fieldset } from "@/components";
import { ReactElement, forwardRef } from "react";
import { TFieldSelect } from "./type";

export const FieldSelect = forwardRef<any, TFieldSelect>((props, ref): ReactElement => {
  return (
    <Fieldset {...props}>
      <Select {...props} ref={ref} />
    </Fieldset>
  );
});

FieldSelect.displayName = "FieldSelect";
