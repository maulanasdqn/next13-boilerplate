import { FieldValues, UseControllerProps } from "react-hook-form";
import { TField } from "@/components";

export type TControlledField<T extends FieldValues> = UseControllerProps<T> & TField;
