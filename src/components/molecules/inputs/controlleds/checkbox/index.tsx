import { CheckBoxField } from "@/components";
import { ReactElement } from "react";
import { FieldValues, useController } from "react-hook-form";
import { TControlledCheckboxField } from "./type";

export const ControlledCheckBoxField = <T extends FieldValues>(
  props: TControlledCheckboxField<T>,
): ReactElement => {
  const { field } = useController<T>(props);
  return <CheckBoxField {...{ ...field, ...props }} />;
};
