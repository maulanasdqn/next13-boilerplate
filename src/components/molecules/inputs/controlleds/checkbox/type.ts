import { FieldValues, UseControllerProps } from "react-hook-form";
import { TCheckboxField } from "../../fields/checkbox/type";

export type TControlledCheckboxField<T extends FieldValues> = UseControllerProps<T> &
  Omit<TCheckboxField, "ref">;
