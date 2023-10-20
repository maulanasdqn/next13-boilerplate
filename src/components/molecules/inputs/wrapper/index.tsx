import { FC, ReactElement } from "react";
import { TInputWrapper } from "./type";
import { Label } from "@/components";

export const InputWrapper: FC<TInputWrapper> = (props): ReactElement => {
  return (
    <section className="flex flex-col gap-y-2">
      {props?.label && <Label required={props.required}>{props.label}</Label>}
      {props.children}
      <span>{props.message}</span>
    </section>
  );
};
