import { TFieldCheckbox } from "@/components/molecules/forms/fields/checkbox/type";
import { FieldValues, UseControllerProps } from "react-hook-form";

export type TControlledFieldText<T extends FieldValues> = UseControllerProps<T> & TFieldCheckbox;
