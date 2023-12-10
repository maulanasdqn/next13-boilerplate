import { forwardRef, useState } from "react";
import DatePicker, { ReactDatePicker, registerLocale } from "react-datepicker";
import type { ReactDatePickerProps } from "react-datepicker";
import id from "date-fns/locale/id";

type TDatePicker = Omit<ReactDatePickerProps, "onChange" | "selectsRange"> & {
  placeholder?: string;
  selectsRange?: boolean;
  required?: boolean;
  value?: string;
};

registerLocale("id", id);

export const InputDate = forwardRef<ReactDatePicker, TDatePicker>((props, ref) => {
  const dateFormat = "dd MMMM yyyy";
  const dateTimeFormat = "dd MMMM yyyy h:mm aa";
  const timeFormat = "h:mm aa";

  return (
    <DatePicker
      {...props}
      dateFormat={
        props.showTimeInput ? dateTimeFormat : props.showTimeSelectOnly ? timeFormat : dateFormat
      }
      onChange={(date) => {
        console.log(date);
      }}
      selectsRange={props?.selectsRange}
      required={props?.required}
      locale="id"
      ref={ref}
      placeholderText={props?.placeholder || "Pilih Tanggal"}
    />
  );
});

InputDate.displayName = "InputDate";
