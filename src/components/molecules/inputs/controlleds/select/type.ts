import { FieldValues, UseControllerProps } from "react-hook-form";
import { TSelectField } from "../../fields/select/type";

export type TControlledSelectField<T extends FieldValues> = UseControllerProps<T> &
  Omit<TSelectField, "ref">;
