import { RadioField } from "@/components";
import { ReactElement } from "react";
import { FieldValues, useController } from "react-hook-form";
import { TControlledRadioField } from "./type";

export const ControlledRadioField = <T extends FieldValues>(
  props: TControlledRadioField<T>,
): ReactElement => {
  const { field } = useController<T>(props);
  return <RadioField {...{ ...field, ...props }} onChange={(e) => field.onChange?.(e)} />;
};
