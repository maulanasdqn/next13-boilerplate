import { FieldDate } from "@/components";
import { ReactElement } from "react";
import { FieldValues, useController } from "react-hook-form";
import { TControlledFieldDate } from "./type";

export const ControlledFieldDate = <T extends FieldValues>(
  props: TControlledFieldDate<T>,
): ReactElement => {
  const { field } = useController(props);
  return <FieldDate {...{ ...props, ...field }} onChange={field.onChange} />;
};
