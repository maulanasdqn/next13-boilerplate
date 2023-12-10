import { Fieldset, InputDate } from "@/components";
import { ReactElement, forwardRef } from "react";
import { TFieldDate } from "./type";
import ReactDatePicker from "react-datepicker";

export const FieldDate = forwardRef<ReactDatePicker, TFieldDate>((props, ref): ReactElement => {
  return (
    <Fieldset {...props}>
      <InputDate {...props} ref={ref} />
    </Fieldset>
  );
});

FieldDate.displayName = "FieldDate";
