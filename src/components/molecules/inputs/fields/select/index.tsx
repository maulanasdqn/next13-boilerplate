import { InputWrapper, TField, className } from "@/components";
import { FC, ReactElement, Ref, forwardRef } from "react";

export const SelectField: FC<TField> = forwardRef(
  (props, ref: Ref<HTMLSelectElement>): ReactElement => {
    return (
      <InputWrapper {...props}>
        <select ref={ref} className={className(props)} {...props}>
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
