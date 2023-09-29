import { Label } from "@/components";
import { FC, HTMLAttributes, ReactElement } from "react";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";

export const TextField: FC<
  HTMLAttributes<HTMLInputElement> & {
    label?: string;
  } & UseControllerProps<FieldValues>
> = (props): ReactElement => {
  const { field } = useController(props);
  return (
    <section className="flex flex-col gap-y-2">
      {props?.label && <Label>{props.label}</Label>}
      <input {...{ ...field, ...props }} />
    </section>
  );
};
