import { InputWrapper, className } from "@/components";
import { FC, ReactElement, forwardRef } from "react";
import { TSelectField } from "./type";

export const SelectField: FC = forwardRef<HTMLSelectElement, TSelectField>(
  (props, ref): ReactElement => {
    return (
      <InputWrapper {...props}>
        <select {...props} ref={ref} className={className(props)}>
          {props?.options?.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </InputWrapper>
    );
  },
);

SelectField.displayName = "SelectField";
