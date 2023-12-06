import { forwardRef } from "react";
import ReactSelect, { StylesConfig } from "react-select";
import { TSelect } from "./type";
import { match } from "ts-pattern";
import { IoChevronDown } from "react-icons/io5";
import { clsx } from "clsx";

export const Select = forwardRef<any, TSelect>((props, ref) => {
  const statusBackgroundColor = match(props.status)
    .with("none", () => "#F9FAFB")
    .with("error", () => "#FEF1F2")
    .otherwise(() => "#F9FAFB");

  const statusBorderColor = match(props.status)
    .with("error", () => "#FCA5A5")
    .otherwise(() => "#D1D5DA");

  const statusTextColor = match(props.status)
    .with("error", () => "#FCA5A5")
    .otherwise(() => "#6A7280");

  const statusDropdownIconColor = clsx("mr-2", {
    "text-red-300": props.status === "error",
    "text-gray-300": props.status === "none" || !props.status,
  });

  const colourStyles: StylesConfig<Record<string, unknown>> = {
    option: (styles, { isDisabled, isFocused }) => {
      return {
        ...styles,
        border: 0,
        fontSize: "12px",
        transition: "all 0.25s",
        cursor: isFocused ? "pointer" : "",
        backgroundColor: isDisabled ? "#F3F4F6" : statusBackgroundColor,
        color: statusTextColor,
      };
    },
    container: (styles) => ({
      ...styles,
      border: 0,
      borderRadius: "8px",
      backgroundColor: statusBackgroundColor,
      cursor: "pointer",
    }),
    indicatorSeparator: (styles, { isDisabled }) => ({
      ...styles,
      backgroundColor: isDisabled ? "#F3F4F6" : statusBackgroundColor,
      color: statusTextColor,
    }),
    control: (styles, { isDisabled }) => ({
      ...styles,
      borderRadius: "8px",
      backgroundColor: isDisabled ? "#F3F4F6" : statusBackgroundColor,
      borderColor: isDisabled ? "#E4E7EB" : statusBorderColor,
      boxShadow: "none",
      ":hover": {
        ...styles[":hover"],
        borderColor: statusBorderColor,
        backgroundColor: isDisabled ? "#F3F4F6" : statusBackgroundColor,
        color: "white",
      },
      ":active": {
        ...styles[":active"],
        borderColor: statusBackgroundColor,
        backgroundColor: isDisabled ? "#F3F4F6" : statusBackgroundColor,
        color: "white",
      },
      ":focus": {
        ...styles[":focus"],
        borderColor: statusBackgroundColor,
        backgroundColor: isDisabled ? "#F3F4F6" : statusBackgroundColor,
        color: "white",
      },
    }),
    valueContainer: (styles) => ({
      ...styles,
      border: 0,
      borderRadius: "8px",
      fontSize: "12px",
      backgroundColor: statusBackgroundColor,
      cursor: "pointer",
    }),
    placeholder: (styles, { isDisabled }) => ({
      ...styles,
      color: isDisabled ? "#D1D5DA" : statusTextColor,
      backgroundColor: statusBackgroundColor,
      fontSize: "12px",
    }),
    multiValue: (styles) => ({
      ...styles,
      borderRadius: "6px",
      fontSize: "14px",
    }),
    noOptionsMessage: (styles) => ({
      ...styles,
      fontSize: "14px",
    }),
    singleValue: (styles) => ({
      ...styles,
      fontSize: "14px",
      border: 0,
      backgroundColor: statusBackgroundColor,
      color: statusTextColor,
    }),
  };
  return (
    <ReactSelect
      {...props}
      ref={ref}
      onChange={(val: any) =>
        props.onChange?.(
          props?.isMulti
            ? val?.map((x: { value: string | number | boolean | undefined | unknown }) => x.value)
            : val.value,
        )
      }
      components={{
        IndicatorSeparator: () => null,
        DropdownIndicator: () => <IoChevronDown className={statusDropdownIconColor} size={20} />,
      }}
      styles={colourStyles}
      value={props.options.find((option) => option?.value === props.value)}
      isDisabled={props?.disabled}
    />
  );
});

Select.displayName = "Select";
