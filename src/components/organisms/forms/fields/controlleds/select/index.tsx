import { FieldSelect } from "@/components";
import { ReactElement } from "react";
import { FieldValues, useController } from "react-hook-form";
import { TControlledFieldSelect } from "./type";

export const ControlledFieldSelect = <T extends FieldValues>(
  props: TControlledFieldSelect<T>,
): ReactElement => {
  const { field } = useController(props);
  return <FieldSelect {...{ ...props, ...field }} />;
};
