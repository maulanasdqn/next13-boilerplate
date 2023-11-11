import { TextField } from "@/components";
import { ReactElement } from "react";
import { FieldValues, useController } from "react-hook-form";
import { TControlledField } from "@/components";

export const ControlledTextField = <T extends FieldValues, K extends HTMLInputElement>(
  props: TControlledField<T, K>,
): ReactElement => {
  const { field } = useController<T>(props);
  return <TextField {...{ ...field, ...props }} />;
};
