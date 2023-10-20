import { TextField } from "@/components";
import { ReactElement } from "react";
import { FieldValues, useController } from "react-hook-form";
import { TControlledTextField } from "./type";

export const ControlledTextField = <T extends FieldValues>(
  props: TControlledTextField<T>,
): ReactElement => {
  const { field } = useController(props);
  return <TextField {...{ ...field, ...props }} />;
};
