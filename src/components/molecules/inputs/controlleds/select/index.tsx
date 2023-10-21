import { SelectField } from "@/components";
import { ReactElement } from "react";
import { FieldValues, useController } from "react-hook-form";
import { TControlledField } from "@/components";

export const ControlledSelectField = <T extends FieldValues>(
  props: TControlledField<T>,
): ReactElement => {
  const { field } = useController(props);
  return <SelectField {...{ ...field, ...props }} />;
};
