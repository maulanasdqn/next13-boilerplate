import { SelectField } from "@/components";
import { ReactElement } from "react";
import { FieldValues, useController } from "react-hook-form";
import { TControlledSelectField } from "./type";

export const ControlledSelectField = <T extends FieldValues>(
  props: TControlledSelectField<T>,
): ReactElement => {
  const { field } = useController<T>(props);
  return <SelectField {...{ ...field, ...props }} />;
};
