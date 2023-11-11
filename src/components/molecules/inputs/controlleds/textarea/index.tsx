import { TextAreaField } from "@/components";
import { ReactElement } from "react";
import { FieldValues, useController } from "react-hook-form";
import { TControlledField } from "@/components";

export const ControlledTextAreaField = <T extends FieldValues, K extends HTMLTextAreaElement>(
  props: TControlledField<T, K>,
): ReactElement => {
  const { field } = useController<T>(props);
  return <TextAreaField {...{ ...field, ...props }} />;
};
