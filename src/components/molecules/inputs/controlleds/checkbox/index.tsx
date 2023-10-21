import { CheckBoxField } from "@/components";
import { ReactElement } from "react";
import { FieldValues, useController } from "react-hook-form";
import { TControlledField } from "@/components";

export const ControlledCheckBoxField = <T extends FieldValues>(
  props: TControlledField<T>,
): ReactElement => {
  const { field } = useController<T>(props);
  return <CheckBoxField {...{ ...field, ...props }} />;
};
