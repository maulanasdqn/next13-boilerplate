import { forwardRef, useState } from "react";
import DatePicker, { ReactDatePicker, registerLocale } from "react-datepicker";
import { TDatePicker } from "./type";
import id from "date-fns/locale/id";
import { inputClassName } from "@/utils";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("id", id);

export const InputDate = forwardRef<ReactDatePicker, TDatePicker>((props, ref) => {
  const dateFormat = "dd MMMM yyyy";
  const dateTimeFormat = "dd MMMM yyyy h:mm aa";
  const timeFormat = "h:mm aa";

  const value = props?.value ? new Date(props?.value) : props.value;

  return (
    <DatePicker
      {...props}
      className={inputClassName(props)}
      dateFormat={
        props.showTimeInput ? dateTimeFormat : props.showTimeSelectOnly ? timeFormat : dateFormat
      }
      onChange={(date) => {
        if (props.selectsRange) {
          props?.onChange?.(date as [Date, Date]);
        } else if (props.showTimeSelectOnly) {
          const newDate = date as Date;
          props?.onChange?.(newDate);
        } else {
          props?.onChange?.(date as Date);
        }
      }}
      selected={!props.selectsRange && (value as any)}
      selectsRange={props?.selectsRange}
      required={props?.required}
      locale="id"
      ref={ref}
      placeholderText={props?.placeholder || "Pilih Tanggal"}
    />
  );
});

InputDate.displayName = "InputDate";
