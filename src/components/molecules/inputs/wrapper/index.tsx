import { FC, Fragment, ReactElement } from "react";
import { Label } from "@/components";
import { clsx } from "clsx";
import { BiErrorCircle, BiCheckCircle } from "react-icons/bi";
import { match } from "ts-pattern";
import { TInputWrapper } from "./type";

export const InputWrapper: FC<TInputWrapper> = (props): ReactElement => {
  const { status = "none" } = props;
  const className = clsx("text-xs flex items-center gap-x-1", {
    "text-red-400": status === "error",
    "text-green-400": status === "success",
    "text-gray-400": status === "none",
    "text-yellow-400": status === "warning",
  });
  return (
    <section className="flex flex-col gap-y-2">
      {props.type === "checkbox" ? (
        <div className="flex gap-x-2">
          {props.children}
          {props?.label && (
            <Label
              htmlFor={props.name}
              disabled={props.disabled}
              size={props.variant}
              required={props.required}
            >
              {props.label}
            </Label>
          )}
        </div>
      ) : (
        <Fragment>
          {props?.label && (
            <Label
              htmlFor={props.name}
              disabled={props.disabled}
              size={props.variant}
              required={props.required}
            >
              {props.label}
            </Label>
          )}
          {props.children}
        </Fragment>
      )}
      {props.message && status !== "none" && (
        <span className={className}>
          {match(status)
            .with("error", () => <BiErrorCircle />)
            .with("success", () => <BiCheckCircle />)
            .with("warning", () => <BiErrorCircle />)
            .exhaustive()}
          {props.message}
        </span>
      )}
    </section>
  );
};
