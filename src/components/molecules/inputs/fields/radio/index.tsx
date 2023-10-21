import { InputWrapper, Label } from "@/components";
import { ReactElement, forwardRef } from "react";
import { TRadioField } from "./type";

export const RadioField = forwardRef<HTMLInputElement, TRadioField>((props, ref): ReactElement => {
  return (
    <InputWrapper {...props}>
      {props?.options?.map((option) => (
        <div className="flex gap-x-1 items-center" key={option.value}>
          <input
            {...props}
            type="radio"
            key={option.value}
            value={option.value}
            ref={ref}
            checked={props.value?.value === option.value}
            onChange={() => props.onChange?.(option)}
            onClick={() => props.value && props.onChange?.(null)}
          />
          <Label
            className="cursor-pointer select-none"
            onClick={() => props.onChange?.(option)}
            size={props.variant}
            disabled={props.disabled}
            htmlFor={props.name}
          >
            {option.label}
          </Label>
        </div>
      ))}
    </InputWrapper>
  );
});
