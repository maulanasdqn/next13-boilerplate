import { FieldValues, UseControllerProps } from "react-hook-form";
import { TRadioField } from "../../fields/radio/type";

export type TControlledRadioField<T extends FieldValues> = UseControllerProps<T> &
  Omit<TRadioField, "ref">;
