import { TextAreaField } from "@/components";
import { ReactElement } from "react";
import { FieldValues, useController } from "react-hook-form";
import { TControlledField } from "@/components";

export const ControlledTextAreaField = <T extends FieldValues>(
  props: TControlledField<T>,
): ReactElement => {
  const { field } = useController(props);
  return <TextAreaField {...{ ...field, ...props }} />;
};
