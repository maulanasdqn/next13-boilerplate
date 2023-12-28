import { TFieldTextArea } from "@/components/molecules/forms/fields/text-area/type";
import { FieldValues, UseControllerProps } from "react-hook-form";

export type TControlledFieldTextArea<T extends FieldValues> = UseControllerProps<T> &
  TFieldTextArea;
