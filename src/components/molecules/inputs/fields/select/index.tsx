import { Label } from "@/components";
import { FC, HTMLAttributes, ReactElement } from "react";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";

export const SelectField: FC<
  HTMLAttributes<HTMLSelectElement> & {
    label?: string;
    options?: Array<{
      value: string;
      label: string;
    }>;
  } & UseControllerProps<FieldValues>
> = (props): ReactElement => {
  const { field } = useController(props);
  return (
    <section className="flex flex-col gap-y-2">
      {props?.label && <Label>{props.label}</Label>}
      <select {...{ ...field, ...props }}>
        {props?.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </section>
  );
};
