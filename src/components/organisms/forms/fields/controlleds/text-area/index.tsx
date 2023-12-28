import { FieldTextArea } from "@/components";
import { ReactElement } from "react";
import { FieldValues, useController } from "react-hook-form";
import { TControlledFieldTextArea } from "./type";

export const ControlledFieldTextArea = <T extends FieldValues>(
  props: TControlledFieldTextArea<T>,
): ReactElement => {
  const { field } = useController(props);
  return <FieldTextArea {...{ ...props, ...field }} />;
};
