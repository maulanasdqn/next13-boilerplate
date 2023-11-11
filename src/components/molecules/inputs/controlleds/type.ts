import { FieldValues, UseControllerProps } from "react-hook-form";
import { TField } from "@/components";

export type TControlledField<T extends FieldValues, K> = UseControllerProps<T> &
  Omit<TField<K>, "ref">;
