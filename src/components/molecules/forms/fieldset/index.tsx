import { FC, ReactElement } from "react";
import { Label, Message } from "@/components";
import { match } from "ts-pattern";
import { TFieldSet } from "@/entities";

export const Fieldset: FC<TFieldSet> = (props): ReactElement => {
  const { status = "none" } = props;

  const inputType = match(props.type)
    .with("checkbox", () => (
      <section className="flex flex-col gap-y-2">
        {props?.label && (
          <Label
            htmlFor={props.name}
            disabled={props.disabled}
            size={props.size}
            required={props.required}
          >
            {props.label}
          </Label>
        )}
        <section className="flex gap-x-2">
          {props.children}
          {props?.text && (
            <Label id={props.name} htmlFor={props.name} disabled={props.disabled} size={props.size}>
              {props.text}
            </Label>
          )}
        </section>
      </section>
    ))
    .with("radio", () => (
      <section className="flex flex-col gap-y-1">
        {props?.label && (
          <Label
            htmlFor={props.name}
            disabled={props.disabled}
            size={props.size}
            required={props.required}
          >
            {props.label}
          </Label>
        )}
        <div className="flex gap-x-4">{props.children}</div>
      </section>
    ))

    .otherwise(() => (
      <section className="relative flex flex-col gap-y-2">
        {props?.label && (
          <Label
            htmlFor={props.name}
            disabled={props.disabled}
            size={props.size}
            required={props.required}
          >
            {props.label}
          </Label>
        )}
        {props?.preppend && (
          <div className="flex items-center gap-x-2 absolute top-3 left-2">{props.preppend}</div>
        )}
        {props.children}
        {props?.append && (
          <div className="flex items-center gap-x-2 absolute top-2 right-3">{props.append}</div>
        )}
      </section>
    ));

  return (
    <fieldset className="flex flex-col gap-y-2">
      {inputType}
      {props.message && status !== "none" && <Message {...props}>{props.message}</Message>}
      {props?.hint && (
        <Message className="text-xs italic mt-[-7px] text-gray-400" status={"none"}>
          *{props.hint}
        </Message>
      )}
    </fieldset>
  );
};
