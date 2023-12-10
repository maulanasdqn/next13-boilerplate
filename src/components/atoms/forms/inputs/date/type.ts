import { TCommonForms } from "@/entities";
import { ReactDatePickerProps } from "react-datepicker";

export type TDatePicker = Omit<ReactDatePickerProps, "onChange" | "selectsRange" | "value"> &
  Pick<TCommonForms, "size" | "status"> & {
    placeholder?: string;
    selectsRange?: boolean;
    required?: boolean;
    value?: string;
    onChange?: (date: Date | [Date, Date]) => void;
  };
